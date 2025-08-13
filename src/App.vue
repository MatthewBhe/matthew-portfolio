<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import About from './components/About.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-radial"></div>
      <div class="absolute inset-0 bg-grid bg-grid opacity-20" style="mask-image: linear-gradient(to bottom, black, transparent 80%);"></div>
      <img src="/assets/noise.svg" alt="" class="absolute inset-0 w-full h-full opacity-[0.045] mix-blend-overlay select-none">
    </div>

    <Navbar />
    <main>
      <Hero />
      <Skills />
      <Projects />
      <About />
    </main>
    <Footer />
  </div>
</template>
