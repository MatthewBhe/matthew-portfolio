<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const projects = [
  {
    title: "Analyseur syntaxique",
    desc: "Interpréteur d’expressions ensemblistes avec Flex et Bison : union, intersection, complément, cardinalité, copie et gestion des doublons. Analyse, exécute et affiche les résultats des expressions utilisateur.",
    img: "/assets/parser.webp",
    link: "https://github.com/MatthewBhe/THL-Final-Project"
  },
  {
    title: "Tower of Hero",
    desc: "Jeu de plateforme 2D en Java (Swing). Améliorez vos héros et gravissez un maximum d’étages en battant les monstres de chaque niveau.",
    img: "/assets/tower-of-hero.webp",
    link: "https://github.com/MatthewBhe/Java-Final-Project"
  },
  {
    title: "Ninja Spectral",
    desc: "Jeu mobile Android publié sur le Play Store. Reproduction d’un niveau de Mario : traversez la carte d’une traite sans mourir pour finir le niveau.",
    img: "/assets/ninja-spectral.webp",
    link: ""
  }
]


const base = projects
const N = base.length
const repeated = [...base, ...base, ...base] 

const viewportRef = ref(null)
const slideWidth = ref(0)
const slidesPerView = ref(2) 

const duration = 450
const current = ref(N)      
const transitioning = ref(true)

const isPointerDown = ref(false)
const startX = ref(0)
const startY = ref(0)
const dragX = ref(0)
const lockedClick = ref(false) 

function measure() {
  if (!viewportRef.value) return
  const w = window.innerWidth
  slidesPerView.value = w < 640 ? 1 : 2
  slideWidth.value = viewportRef.value.clientWidth / slidesPerView.value
}

function go(delta) {
  if (!slideWidth.value) measure()
  transitioning.value = true
  current.value += delta

  window.setTimeout(() => {
    if (current.value >= 2 * N) {
      transitioning.value = false
      current.value -= N
    } else if (current.value < N) {
      transitioning.value = false
      current.value += N
    }
  }, duration + 20)
}

const next = () => go(1)
const prev = () => go(-1)

function onPointerDown(e) {
  isPointerDown.value = true
  transitioning.value = false
  dragX.value = 0
  lockedClick.value = false

  const p = 'touches' in e ? e.touches[0] : e
  startX.value = p.clientX
  startY.value = p.clientY
}

function onPointerMove(e) {
  if (!isPointerDown.value) return
  const p = 'touches' in e ? e.touches[0] : e
  const dx = p.clientX - startX.value
  const dy = p.clientY - startY.value

  if (Math.abs(dy) > Math.abs(dx) * 1.2) return

  dragX.value = dx
  if (Math.abs(dx) > 8) lockedClick.value = true 
}

function onPointerUpCancel() {
  if (!isPointerDown.value) return
  isPointerDown.value = false

  const threshold = Math.max(40, slideWidth.value * 0.2)
  if (Math.abs(dragX.value) > threshold) {
    if (dragX.value < 0) next()
    else prev()
  } else {
    transitioning.value = true
  }
  dragX.value = 0
}

function onSlideClick(ev) {
  if (lockedClick.value) {
    ev.preventDefault()
    ev.stopPropagation()
  }
}

onMounted(() => {
  measure()
  const ro = new ResizeObserver(measure)
  ro.observe(viewportRef.value)
  window.addEventListener("resize", measure)
  onBeforeUnmount(() => {
    ro.disconnect()
    window.removeEventListener("resize", measure)
  })
})
</script>

<template>
  <section id="projets" class="section relative" data-reveal>
    <div class="container">
      <div class="flex items-baseline justify-between mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold">Mes projets</h2>
        <a href="https://github.com/MatthewBhe" target="_blank" class="text-sm hover:text-brand-accent">
          Plus sur GitHub ↗
        </a>
      </div>

      <div class="relative overflow-visible">
                 <div class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#101820] to-transparent z-[2]"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#101820] to-transparent z-[2]"></div>

                 <div
          ref="viewportRef"
          class="overflow-hidden select-none"
          style="touch-action: pan-y;"
          @pointerdown.passive="onPointerDown"
          @pointermove.passive="onPointerMove"
          @pointerup.passive="onPointerUpCancel"
          @pointercancel.passive="onPointerUpCancel"
          @touchstart.passive="onPointerDown"
          @touchmove.passive="onPointerMove"
          @touchend.passive="onPointerUpCancel"
          @touchcancel.passive="onPointerUpCancel"
        >
                     <div
            class="flex cursor-grab active:cursor-grabbing"
            :style="{
              transform: `translateX(${-(current - N) * slideWidth + dragX}px)`,
              transition: transitioning ? `transform ${duration}ms ease` : 'none'
            }"
          >
                         <a
              v-for="(p, i) in repeated"
              :key="i"
              :href="p.link"
              target="_blank"
              class="group shrink-0 px-3 box-border"
              :style="{ width: slideWidth + 'px' }"
              @click="onSlideClick"
            >
              <div class="card overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-accent/70">
                <div class="relative">
                  <img :src="p.img" :alt="p.title"
                       class="h-56 w-full object-cover transition duration-500 group-hover:scale-105">
                  <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold">{{ p.title }}</h3>
                    <span
                      class="px-3 py-1 rounded-full text-xs bg-brand-accent text-brand-dark font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      Voir
                    </span>
                  </div>
                  <p class="text-sm text-white/70 mt-2">{{ p.desc }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

                 <button @click="prev" class="arrow-btn left-arrow" aria-label="Précédent">←</button>
        <button @click="next" class="arrow-btn right-arrow" aria-label="Suivant">→</button>
      </div>
    </div>
  </section>
</template>

<style scoped>

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: grid;
  place-items: center;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  color: #fff;
  transition: transform 180ms ease, background 180ms ease;
  overflow: hidden;
  height: 44px;
  width: 44px;
}
.left-arrow  { left: -3.5rem; }
.right-arrow { right: -3.5rem; }


.arrow-btn:hover {
  transform: translateY(-50%) scale(1.1);
  background: rgba(255,255,255,0.12);
}
.arrow-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0.55) 50%,
    rgba(255,255,255,0) 60%
  );
  transform: translateX(-120%) skewX(-12deg);
  transition: transform 600ms ease;
  pointer-events: none;
  mix-blend-mode: screen;
}
.arrow-btn:hover::after { transform: translateX(120%) skewX(-12deg); }


@media (max-width: 640px) {
  .arrow-btn { height: 36px; width: 36px; }
  .left-arrow  { left: max(0.5rem, env(safe-area-inset-left)); }
  .right-arrow { right: max(0.5rem, env(safe-area-inset-right)); }
  .arrow-btn:hover { transform: translateY(-50%) scale(1.08); }
}
</style>
