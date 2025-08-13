<template>
  <span
    ref="rootRef"
    :class="className"
    :style="{ display: 'inline', ...styleObj }"
    @click="onClick && onClick()"
  >
    <span
      v-for="(word, wordIndex) in words"
      :key="wordIndex"
      :style="{ display: 'inline-block', whiteSpace: 'nowrap' }"
    >
      <span
        v-for="(letter, letterIndex) in word.split('')"
        :key="getLetterKey(wordIndex, letterIndex)"
        :style="{
          display: 'inline-block',
          fontVariationSettings: fromFontVariationSettings
        }"
        class="letter"
        :data-index="getGlobalLetterIndex(wordIndex, letterIndex)"
        aria-hidden="true"
      >
        {{ letter }}
      </span>
      <span v-if="wordIndex < words.length - 1" class="inline-block">&nbsp;</span>
    </span>

    <!-- Texte accessible pour lecteurs d'écran -->
    <span class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap clip-rect-0 border-0">
      {{ label }}
    </span>
  </span>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  fromFontVariationSettings: { type: String, required: true }, // ex: "'wght' 400, 'opsz' 12"
  toFontVariationSettings: { type: String, required: true },   // ex: "'wght' 1000, 'opsz' 48"
  containerRef: { type: Object, default: null }, // ref HTMLElement
  radius: { type: Number, default: 80 },
  falloff: { type: String, default: 'linear' }, // 'linear' | 'exponential' | 'gaussian'
  className: { type: String, default: '' },
  styleObj: { type: Object, default: () => ({}) },
  onClick: { type: Function, default: null }
})

const rootRef = ref(null)
const letterElements = ref([])
const mousePosition = ref({ x: 0, y: 0 })
const lastPosition = ref({ x: null, y: null })
const interpolatedSettings = ref([])
let animationFrameId = null

const words = computed(() => props.label.split(' '))

const parsedSettings = computed(() => {
  const parseSettings = (s) => {
    const m = new Map()
    s.split(',').forEach(part => {
      const pieces = part.trim().split(' ')
      if (pieces.length === 2) {
        const axis = pieces[0].replace(/['"]/g, '')
        const val = parseFloat(pieces[1])
        m.set(axis, val)
      }
    })
    return m
  }
  const from = parseSettings(props.fromFontVariationSettings)
  const to = parseSettings(props.toFontVariationSettings)
  return Array.from(from.entries()).map(([axis, fromValue]) => ({
    axis,
    fromValue,
    toValue: to.get(axis) ?? fromValue
  }))
})

const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)

const falloffFn = (d) => {
  const norm = Math.min(Math.max(1 - d / props.radius, 0), 1)
  switch (props.falloff) {
    case 'exponential': return norm ** 2
    case 'gaussian': return Math.exp(-((d / (props.radius / 2)) ** 2) / 2)
    default: return norm
  }
}

const getLetterKey = (wi, li) => `${wi}-${li}`
const getGlobalLetterIndex = (wi, li) => {
  let idx = 0
  for (let i = 0; i < wi; i++) idx += words.value[i].length
  return idx + li
}

const initLetters = () => {
  if (!rootRef.value) return
  letterElements.value = Array.from(rootRef.value.querySelectorAll('.letter'))
}

const handleMouse = (clientX, clientY) => {
  const container = (props.containerRef && props.containerRef.value) || rootRef.value
  if (!container) return
  const rect = container.getBoundingClientRect()
  mousePosition.value = { x: clientX - rect.left, y: clientY - rect.top }
}

const onMouseMove = (e) => handleMouse(e.clientX, e.clientY)
const onTouchMove = (e) => {
  const t = e.touches[0]
  if (t) handleMouse(t.clientX, t.clientY)
}

const loop = () => {
  const container = (props.containerRef && props.containerRef.value) || rootRef.value
  if (!container || letterElements.value.length === 0) {
    animationFrameId = requestAnimationFrame(loop)
    return
  }
  const containerRect = container.getBoundingClientRect()

  if (lastPosition.value.x === mousePosition.value.x && lastPosition.value.y === mousePosition.value.y) {
    animationFrameId = requestAnimationFrame(loop)
    return
  }
  lastPosition.value = { x: mousePosition.value.x, y: mousePosition.value.y }

  const newSettings = Array(letterElements.value.length).fill(props.fromFontVariationSettings)

  letterElements.value.forEach((el, idx) => {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2 - containerRect.left
    const cy = r.top + r.height / 2 - containerRect.top
    const d = dist(mousePosition.value.x, mousePosition.value.y, cx, cy)
    if (d >= props.radius) return

    const f = falloffFn(d)
    const setting = parsedSettings.value.map(({ axis, fromValue, toValue }) => {
      const v = fromValue + (toValue - fromValue) * f
      return `'${axis}' ${v}`
    }).join(', ')
    newSettings[idx] = setting
  })

  interpolatedSettings.value = newSettings
  letterElements.value.forEach((el, i) => { el.style.fontVariationSettings = interpolatedSettings.value[i] })
  animationFrameId = requestAnimationFrame(loop)
}

onMounted(() => {
  nextTick(() => {
    initLetters()
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    animationFrameId = requestAnimationFrame(loop)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>

</style>
