<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 10 }
onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header :class="['fixed top-0 inset-x-0 z-50 transition-all duration-500', scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/10' : '']">
    <nav class="container flex items-center justify-between h-16">
      <a href="#" class="group inline-flex items-center gap-3">
        <span class="h-8 w-8 rounded-xl bg-brand-accent text-brand-dark grid place-content-center font-black">MB</span>
        <span class="font-semibold tracking-wide">Matthew Bonhomme</span>
      </a>

      <button class="md:hidden btn btn--ghost px-3 py-2" @click="open = !open" aria-label="Ouvrir le menu">
        <span v-if="!open">Menu</span>
        <span v-else>Fermer</span>
      </button>

      <ul class="hidden md:flex gap-6 text-sm">
        <li><a href="#competences" class="hover:text-brand-accent">Compétences</a></li>
        <li><a href="#projets" class="hover:text-brand-accent">Projets</a></li>
        <li><a href="#a-propos" class="hover:text-brand-accent">À propos</a></li>
      </ul>
    </nav>

    <transition name="slide-fade">
      <div v-if="open" class="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
        <div class="container py-4 flex flex-col gap-4">
          <a href="#competences" class="hover:text-brand-accent" @click="open=false">Compétences</a>
          <a href="#projets" class="hover:text-brand-accent" @click="open=false">Projets</a>
          <a href="#a-propos" class="hover:text-brand-accent" @click="open=false">À propos</a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-fade-enter-active,.slide-fade-leave-active{transition:all .25s ease}
.slide-fade-enter-from,.slide-fade-leave-to{opacity:0;transform:translateY(-6px)}
</style>
