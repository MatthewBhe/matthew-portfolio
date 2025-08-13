<script setup>
import { ref } from 'vue'
import ContactForm from './ContactForm.vue'


const showContact = ref(false)
</script>

<template>
  <section id="a-propos" class="section">
    <div class="container grid md:grid-cols-2 gap-10">
      <!-- Texte -->
      <div class="space-y-4" data-reveal>
        <h2 class="text-2xl sm:text-3xl font-bold">À propos de moi</h2>
        <p class="text-white/75">
          Je m'appelle Matthew Bonhomme, développeur passionné dans le web et le mobile. Curieux et déterminé, j’attache une grande importance à la qualité du code et à l’expérience utilisateur.
        </p>
        <p class="text-white/75">
          Fort de plusieurs projets réalisés en Java, Vue.js ou Android, je développe des solutions modernes, performantes et sur mesure. Mon objectif est d’allier créativité et rigueur technique pour donner vie à des interfaces élégantes.
        </p>
        <p class="text-white/75">
          Toujours avide d’apprendre, j’évolue dans un environnement où l’innovation et la collaboration sont au cœur de ma démarche. Découvrir, tester, partager : voilà ce qui me motive chaque jour.
        </p>
      </div>

      <!-- Carte à droite -->
      <div class="card p-6 relative overflow-hidden self-center" data-reveal>
        <div
          class="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_linear_infinite]"
          style="background-size:200% 100%"
        ></div>

        <div class="relative space-y-4">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xl font-black text-brand-accent">Web</div>
              <div class="text-xs text-white/60">Vue / Nuxt / Node</div>
            </div>
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xl font-black text-brand-accent">Mobile</div>
              <div class="text-xs text-white/60">Android / Java</div>
            </div>
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xl font-black text-brand-accent">Qualité</div>
              <div class="text-xs text-white/60">UX / Performance</div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="flex flex-wrap gap-3 justify-center">
            <button type="button" class="btn btn--primary btn--glare" @click="showContact = true">
              Me contacter
            </button>
            <a href="/assets/cv-matthew-bonhomme.pdf" target="_blank" class="btn btn--ghost btn--glare">
              Voir mon CV
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Modale Contact -->
    <transition name="fade">
      <div v-if="showContact" class="fixed inset-0 z-[90] flex items-center justify-center">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showContact = false"></div>

        <div class="relative z-[91] w-[92%] max-w-xl rounded-2xl border border-white/10 bg-[#101820]/90 text-white p-6 shadow-2xl overflow-hidden">
          <div class="pointer-events-none absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_linear_infinite]" style="background-size:200% 100%"></div>
          <div class="relative">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold">Me contacter</h3>
              <button @click="showContact = false" class="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15">✕</button>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>
