<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const textContainerRef = ref<HTMLElement | null>(null)

const mousePosition = reactive({ x: 0, y: 0 })
const windowWidth = ref(1920)
const windowHeight = ref(1080)

const stars = ref<any[]>([])

const backgroundStyle = ref({})
const textColor = ref('')
const textShadowStyle = ref({})

let rafId: number | null = null

function updateDynamicStyles() {
  const { x, y } = mousePosition
  const xPercent = (x / windowWidth.value) * 100
  const yPercent = (y / windowHeight.value) * 100

  backgroundStyle.value = {
    background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, #4b0082, #000000)`
  }

  const distance = Math.sqrt((x - windowWidth.value / 2) ** 2 + (y - windowHeight.value / 2) ** 2)
  const maxDistance = Math.sqrt((windowWidth.value / 2) ** 2 + (windowHeight.value / 2) ** 2)
  const intensity = 1 - Math.min(distance / maxDistance, 1)
  textColor.value = `rgb(${166 + intensity * 89}, ${74 + intensity * 181}, ${201 + intensity * 54})`

  const rect = textContainerRef.value?.getBoundingClientRect()
  if (rect) {
    const textCenterX = rect.left + rect.width / 2
    const textCenterY = rect.top + rect.height / 2
    const deltaX = x - textCenterX
    const deltaY = y - textCenterY
    const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    const maxDist = Math.min(windowWidth.value, windowHeight.value) / 2
    const shadowIntensity = Math.min(dist / maxDist, 1)
    const shadowX = (-deltaX / 15) * shadowIntensity
    const shadowY = (-deltaY / 15) * shadowIntensity
    const shadowBlur = 10 + 30 * shadowIntensity

    textShadowStyle.value = {
      textShadow: `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.75),
        0 0 10px rgba(166, 74, 201, 0.8),
        0 0 20px rgba(166, 74, 201, 0.5),
        0 0 30px rgba(75, 0, 130, 0.4)
      `
    }
  }

  rafId = requestAnimationFrame(updateDynamicStyles)
}

function handleMouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX
  mousePosition.y = event.clientY
}

function handleResize() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  mousePosition.x = window.innerWidth / 2
  mousePosition.y = window.innerHeight / 2
}

function generateStars(count = 300) {
  stars.value = Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    opacity: Math.random() * 0.5 + 0.3,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${2 + Math.random() * 3}s`
  }))
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  generateStars()
  rafId = requestAnimationFrame(updateDynamicStyles)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (rafId) cancelAnimationFrame(rafId)
})

// Scroll
function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}
function scrollToComp() {
  document.getElementById('compe')?.scrollIntoView({ behavior: 'smooth' })
}
function scrollToAbout() {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    ref="sectionRef"
    @mousemove="handleMouseMove"
    class="h-screen flex flex-col justify-center items-center relative bg-black text-white overflow-hidden"
  >
    <!-- Les étoiles dessous -->
    <div class="stars absolute inset-0 pointer-events-none z-0">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :style="{
          top: star.top,
          left: star.left,
          width: star.size,
          height: star.size,
          opacity: star.opacity,
          animationDelay: star.animationDelay,
          animationDuration: star.animationDuration
        }"
      ></div>
    </div>

    <!-- Gradient AU-DESSUS du fond étoilé -->
    <div class="absolute inset-0 transition-all duration-300 ease-out z-10" :style="backgroundStyle"></div>

    <div
      ref="textContainerRef"
      class="absolute left-1/2 transform -translate-x-1/2 text-center z-20"
      style="top: 33%;"
    >
      <h2 class="text-5xl font-semibold mb-2 tracking-wider" :style="[textShadowStyle, { color: textColor }]">MATTHEW</h2>
      <h1 class="text-9xl font-bold tracking-tight" :style="[textShadowStyle, { color: textColor }]">BONHOMME</h1>
      <p
        class="text-base md:text-lg font-medium tracking-wide mt-4 leading-relaxed max-w-xl mx-auto px-4"
        :style="{ color: textColor }"
      >
        Étudiant en développement web, passionné par les interfaces créatives, l’expérience utilisateur et les défis techniques.
        Curieux de nature, j’aime explorer de nouvelles technologies et repousser mes limites.
      </p>

      <div class="mt-8 inline-flex shadow-md rounded-full overflow-hidden">
        <div class="inline-flex backdrop-blur-md bg-white/10 border border-white/20 shadow-lg overflow-hidden rounded-full">
          <button @click="scrollToProjects"
            class="relative px-6 py-3 font-semibold text-white transition duration-300 transform hover:scale-110 hover:bg-fuchsia-500/40 border-r border-white/10 rounded-l-full">
            Mes projets
          </button>
          <button @click="scrollToComp"
            class="relative px-6 py-3 font-semibold text-white transition duration-300 transform hover:scale-110 hover:bg-indigo-500/40 border-r border-white/10">
            Compétences
          </button>
          <button @click="scrollToAbout"
            class="relative px-6 py-3 font-semibold text-white transition duration-300 transform hover:scale-110 hover:bg-purple-500/40 rounded-r-full">
            À propos
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 5s infinite ease-in-out;
}

@keyframes twinkle {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

button {
  border-radius: 0;
}
</style>
