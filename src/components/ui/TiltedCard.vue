<template>
  <figure
    ref="cardRef"
    class="tilt-card-root relative w-full h-full [perspective:800px] flex flex-col items-center justify-center select-none"
    :style="{ height: containerHeight, width: containerWidth }"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @touchmove.passive="onTouchMove"
    @touchstart.passive="onEnter"
    @touchend.passive="onLeave"
  >
         <div
      ref="innerRef"
      class="tilt-card-inner relative [transform-style:preserve-3d] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden"
      :style="{
        width: imageWidth,
        height: imageHeight,
        transform: transformStyle,
        '--glare-color': glareRgba,
        '--glare-duration': glareDuration + 'ms',
        '--glare-angle': glareAngle + 'deg'
      }"
    >
             <img
        :src="imageSrc"
        :alt="altText"
        class="absolute inset-0 m-auto object-contain p-5"
        :style="{ width: imageWidth, height: imageHeight, transform: 'translateZ(24px)' }"
        draggable="false"
      />

             <div
        v-if="$slots.overlay && displayOverlayContent"
        class="absolute inset-0 z-[2]"
        :style="{ transform: 'translateZ(30px)' }"
      >
        <slot name="overlay" />
      </div>
    </div>

         <figcaption class="mt-3 text-sm font-medium text-white/80">
      {{ captionText }}
    </figcaption>
  </figure>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  imageSrc: { type: String, required: true },
  altText: { type: String, default: 'Tilted card image' },
  captionText: { type: String, default: '' },
  containerHeight: { type: String, default: '140px' },
  containerWidth:  { type: String, default: '100%' },
  imageHeight:     { type: String, default: '140px' },
  imageWidth:      { type: String, default: '140px' },
  scaleOnHover:    { type: Number, default: 1.08 },
  rotateAmplitude: { type: Number, default: 14 },
  displayOverlayContent: { type: Boolean, default: false },

  // Glare (reflet)
  glareColor:     { type: String, default: '#ffffff' },
  glareOpacity:   { type: Number, default: 0.35 },
  glareAngle:     { type: Number, default: -35 }, // degrés
  glareDuration:  { type: Number, default: 900 }, // ms
})

const cardRef = ref(null)
const rotateX = ref(0)
const rotateY = ref(0)
const scale   = ref(1)

let targetRX = 0, targetRY = 0
let rafId = null

const transformStyle = computed(() =>
  `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale(${scale.value})`
)

const glareRgba = computed(() => {
  const hex = props.glareColor.replace('#', '')
  let r = 255, g = 255, b = 255
  if (/^[\da-f]{6}$/i.test(hex)) {
    r = parseInt(hex.slice(0,2),16)
    g = parseInt(hex.slice(2,4),16)
    b = parseInt(hex.slice(4,6),16)
  } else if (/^[\da-f]{3}$/i.test(hex)) {
    r = parseInt(hex[0]+hex[0],16)
    g = parseInt(hex[1]+hex[1],16)
    b = parseInt(hex[2]+hex[2],16)
  }
  return `rgba(${r}, ${g}, ${b}, ${props.glareOpacity})`
})

const animate = () => {
  rotateX.value += (targetRX - rotateX.value) * 0.2
  rotateY.value += (targetRY - rotateY.value) * 0.2
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  rafId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

function setTargetsFromEvent(clientX, clientY) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const ox = clientX - rect.left - rect.width / 2
  const oy = clientY - rect.top  - rect.height / 2
  const rx = (oy / (rect.height / 2)) * -props.rotateAmplitude
  const ry = (ox / (rect.width  / 2)) *  props.rotateAmplitude
  targetRX = Math.max(-props.rotateAmplitude, Math.min(props.rotateAmplitude, rx))
  targetRY = Math.max(-props.rotateAmplitude, Math.min(props.rotateAmplitude, ry))
}

function onMove(e) {
  setTargetsFromEvent(e.clientX, e.clientY)
}

function onTouchMove(e) {
  const t = e.touches[0]
  if (t) setTargetsFromEvent(t.clientX, t.clientY)
}

function onEnter() {
  scale.value = props.scaleOnHover
}

function onLeave() {
  scale.value = 1
  targetRX = 0
  targetRY = 0
}
</script>

<style scoped>

.tilt-card-inner {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tilt-card-inner::after {
  content: "";
  position: absolute;
  inset: -40%;
  pointer-events: none;

  background: linear-gradient(
    var(--glare-angle, 130deg),
    rgba(255, 255, 255, 0) 45%,
    var(--glare-color, rgba(255,255,255,.3)) 50%,
    rgba(255, 255, 255, 0) 55%
  );
  transform: translate3d(-120%, -120%, 40px);
  transition: transform var(--glare-duration, 800ms) ease;
  mix-blend-mode: screen; 
}

.tilt-card-root:hover .tilt-card-inner::after {
  transform: translate3d(120%, 120%, 40px);
}
</style>
