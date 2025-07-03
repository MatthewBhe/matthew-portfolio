<script setup>
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const projects = [
  {
    title: 'Tower of Hero',
    description: "Jeu de plateforme 2D réalisé en Java avec Swing. Le joueur doit améliorer ses héros et gravir le plus d'étages possible en battant les monstres présents à chaque niveau.",
    image: '/img/tower-of-hero.png',
    link: 'https://github.com/MatthewBhe/Java-Final-Project'
  },
  {
    title: 'Analyseur syntaxique',
    description: "Ce projet est un interpréteur d’expressions ensemblistes avec Flex et Bison. Il prend en charge l’union, l’intersection, le complément, la cardinalité, la copie d’ensembles et la gestion des doublons. L’interpréteur analyse, exécute et affiche les résultats des expressions fournies par l’utilisateur.",
    image: '/img/auto.png',
    link: 'https://github.com/MatthewBhe/THL-Final-Project'
  },
  {
    title: 'Ninja Spectral',
    description: "Ce projet est un jeu mobile développé sous Android Studio et publié sur le Play Store. Le but du projet est de reproduire un niveau de Mario où le joueur doit parcourir toute la carte sans mourir pour terminer le niveau. ",
    image: '/img/ninjaSpectral.png',
    link: ''
  }
]
</script>

<style scoped>
#tech-grid {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #0e0e10 0%, #1a1a1d 100%);
  opacity: 0.7;
  z-index: -1;
}
</style>

<script>
onMounted(() => {
  const canvas = document.getElementById("tech-grid")
  const ctx = canvas.getContext("2d")

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resize)
  resize()

  let lines = []
  for (let i = 0; i < 50; i++) {
    lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 200 + Math.random() * 200,
      speed: 0.3 + Math.random() * 0.7
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "rgba(0, 255, 255, 0.2)"
    ctx.lineWidth = 1

    for (let line of lines) {
      ctx.beginPath()
      ctx.moveTo(line.x, line.y)
      ctx.lineTo(line.x, line.y + line.length)
      ctx.stroke()
      line.y += line.speed
      if (line.y > canvas.height) {
        line.y = -line.length
        line.x = Math.random() * canvas.width
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
})
</script>


<template>
  <section
    id="projects"
    class="h-screen w-full flex items-center justify-center px-4 py-20 relative overflow-hidden font-sans bg-gradient-to-br from-sky-50 via-slate-100 to-sky-200 text-black"
  >
    <div class="absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
    <div class="absolute inset-0 backdrop-blur-sm shadow-inner shadow-indigo-200/40 z-0"></div>

      <!-- Tech grid background -->
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <canvas id="tech-grid" class="w-full h-full"></canvas>
      </div>

    <div class="max-w-6xl w-full z-10">
      <h2 class="text-5xl font-bold text-center mb-16 tracking-wide drop-shadow animate-fade-in text-gray-800">
        <span class="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Projets sélectionnés
        </span>
      </h2>

      <div class="relative flex items-center justify-center gap-6">
        <button
          class="prev-btn flex items-center justify-center text-4xl w-14 h-14 rounded-full transition duration-300 text-gray-700 bg-white/70 shadow-md hover:scale-110"
        >
          ‹
        </button>

        <Swiper
          :modules="[Navigation]"
          :spaceBetween="32"
          :loop="true"
          :navigation="{ nextEl: '.next-btn', prevEl: '.prev-btn' }"
          :breakpoints="{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 }
          }"
          class="w-full"
        >
          <SwiperSlide
            v-for="(project, index) in projects"
            :key="index"
          >
          <div
            class="relative p-6 rounded-3xl border border-indigo-200 animate-pulse-slow bg-white aspect-square text-center overflow-hidden shadow-lg transition-all duration-500 hover:border-2 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-300/40 group"
          >
              <h3 class="text-2xl font-semibold text-indigo-600 mb-2 group-hover:text-indigo-700 transition">
                {{ project.title }}
              </h3>

              <img
                v-if="project.image"
                :src="project.image"
                class="w-full h-40 object-cover rounded-md shadow-sm"
              />

              <div class="absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 w-[90%] px-2">
                <p class="text-gray-600 text-base leading-relaxed group-hover:text-gray-800 transition">
                  {{ project.description }}
                </p>
              </div>

              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener"
                class="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <svg
                  class="w-8 h-8 text-gray-500 hover:text-indigo-600 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0C5.375 0 0 5.375 0 12c0 5.3 3.438 9.8 8.207 11.387.6.112.793-.263.793-.587 0-.288-.012-1.238-.018-2.245-3.338.725-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.081-.731.081-.731 1.2.087 1.832 1.238 1.832 1.238 1.07 1.831 2.807 1.302 3.492.994.107-.775.42-1.302.763-1.6-2.665-.3-5.467-1.334-5.467-5.932 0-1.312.469-2.387 1.237-3.23-.125-.3-.537-1.512.117-3.152 0 0 1.008-.324 3.3 1.23.957-.267 1.98-.4 3-.406 1.02.006 2.043.14 3 .406 2.289-1.554 3.295-1.23 3.295-1.23.656 1.64.244 2.852.12 3.152.771.843 1.236 1.918 1.236 3.23 0 4.61-2.807 5.628-5.479 5.922.432.375.816 1.125.816 2.27 0 1.64-.015 2.965-.015 3.37 0 .327.192.705.8.586C20.565 21.795 24 17.295 24 12c0-6.625-5.375-12-12-12z"
                  />
                </svg>
              </a>
            </div>
          </SwiperSlide>
        </Swiper>

        <button
          class="next-btn flex items-center justify-center text-4xl w-14 h-14 rounded-full transition duration-300 text-gray-700 bg-white/70 shadow-md hover:scale-110"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.2);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(129, 140, 248, 0.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out;
}

@keyframes pulse-slow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.2);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(129, 140, 248, 0.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out;
}

#tech-grid {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #0e0e10 0%, #1a1a1d 100%);
  opacity: 0.7;
  z-index: -1;
}
</style>