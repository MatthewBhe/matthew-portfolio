<script setup lang="ts">
import { ref } from 'vue'

// Refs pour le texte
const textContainerRef = ref<HTMLElement | null>(null)

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
    class="h-screen flex flex-col justify-center items-center relative overflow-hidden text-white bg-gradient-to-b from-indigo-900 to-black"
  >
    <div
      ref="textContainerRef"
      class="absolute left-1/2 transform -translate-x-1/2 text-center z-10"
      style="top: 33%;"
    >
      <h2 class="text-5xl font-semibold mb-2 tracking-wider">MATTHEW</h2>
      <h1 class="text-9xl font-bold tracking-tight">BONHOMME</h1>
      <p class="text-base md:text-lg font-medium tracking-wide mt-4 leading-relaxed max-w-xl mx-auto px-4">
        Étudiant en développement web, passionné par les interfaces créatives, l’expérience utilisateur et les défis techniques.
        Curieux de nature, j’aime explorer de nouvelles technologies et repousser mes limites.
      </p>

      <div class="mt-8 inline-flex shadow-md rounded-full overflow-hidden">
        <div class="inline-flex backdrop-blur-md bg-white/10 border border-white/20 shadow-lg overflow-hidden rounded-full">
          <button
            @click="scrollToProjects"
            class="relative px-6 py-3 font-semibold text-white transition duration-300 transform hover:scale-110 hover:bg-fuchsia-500/40 border-r border-white/10 rounded-l-full"
          >
            Mes projets
          </button>
          <button
            @click="scrollToComp"
            class="relative px-6 py-3 font-semibold text-white transition duration-300 transform hover:scale-110 hover:bg-indigo-500/40 border-r border-white/10"
          >
            Compétences
          </button>
          <button
            @click="scrollToAbout"
            class="relative px-6 py-3 font-semibold text-white transition duration-300 transform hover:scale-110 hover:bg-purple-500/40 rounded-r-full"
          >
            À propos
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
button {
  border-radius: 0;
}
</style>
