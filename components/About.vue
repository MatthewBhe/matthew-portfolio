<template>
  <section 
    id="about"
    class="w-full min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gradient-to-br from-[#0d0d1a] via-[#121222] to-[#1a1a33] relative overflow-hidden text-white">
    <div class="absolute -top-10 left-10 w-96 h-96 bg-indigo-700 opacity-10 blur-3xl rounded-full animate-pulse-slow"></div>
    <div class="absolute -bottom-10 right-10 w-96 h-96 bg-purple-700 opacity-10 blur-3xl rounded-full animate-pulse-slow"></div>

    <div class="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 z-10">

      <div class="flex-1 text-center md:text-left">
        <h2 class="text-4xl font-bold mb-6 drop-shadow">
          <span class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            À propos de moi
          </span>
        </h2>
        <p class="leading-relaxed text-lg mb-4 text-gray-200">
          Je m'appelle <strong>Matthew Bonhomme</strong>, développeur passionné dans le web et le mobile.
          Curieux et déterminé, j’attache une grande importance à la qualité du code et à l’expérience utilisateur.
        </p>
        <p class="leading-relaxed text-lg mb-4 text-gray-200">
          Fort de plusieurs projets réalisés en <strong>Java</strong>, <strong>Vue.js</strong> ou <strong>Android</strong>,
          je développe des solutions modernes, performantes et sur mesure.
          Mon objectif est d’allier créativité et rigueur technique pour donner vie à des interfaces élégantes.
        </p>
        <p class="leading-relaxed text-lg text-gray-200">
          Toujours avide d’apprendre, j’évolue dans un environnement où l’innovation et la collaboration sont au cœur de ma démarche.
          Découvrir, tester, partager : voilà ce qui me motive chaque jour.
        </p>

        <div class="mt-8 mb-10">
          <a
            href="./docs/BONHOMME_Matthew_CV.pdf"
            download="CV_Matthew_Bonhomme.pdf"
            target="_blank"
            class="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            Télécharger mon CV
          </a>
        </div>



        <div class="flex justify-center md:justify-start gap-6 mt-4">
          <a href="https://github.com/MatthewBhe" target="_blank" class="text-gray-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
              3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.084-.729.084-.729 
              1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 
              3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.931 
              0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 
              0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 
              3.003-.404 1.02.005 2.047.138 
              3.006.404 2.291-1.552 3.297-1.23 
              3.297-1.23.653 1.653.242 2.873.118 
              3.176.77.84 1.234 1.911 1.234 3.221 
              0 4.609-2.807 5.628-5.479 5.921.43.372.823 
              1.102.823 2.222 0 1.604-.015 2.896-.015 
              3.286 0 .319.216.694.825.576C20.565 
              22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/matthew-bonhomme-302a35215/" target="_blank" class="text-gray-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.762 
              0-5 2.238-5 5v14c0 2.762 2.238 
              5 5 5h14c2.762 0 5-2.238 
              5-5v-14c0-2.762-2.238-5-5-5zm-11 
              19h-3v-10h3v10zm-1.5-11.268c-.966 
              0-1.75-.79-1.75-1.732s.784-1.732 
              1.75-1.732 1.75.79 
              1.75 1.732-.784 1.732-1.75 
              1.732zm13.5 11.268h-3v-5.604c0-3.368-4-3.114-4 
              0v5.604h-3v-10h3v1.528c1.396-2.586 
              7-2.777 7 2.476v5.996z"/>
            </svg>
          </a>
          
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 10s ease-in-out infinite;
}
</style>
