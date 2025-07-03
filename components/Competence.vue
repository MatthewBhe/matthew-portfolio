<template>
  <section 
    id="compe"
    class="w-full h-screen flex flex-col justify-center items-center px-4 py-20 bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-100 relative overflow-hidden">


    <div class="absolute -top-10 -left-10 w-80 h-80 bg-purple-300 opacity-30 blur-3xl rounded-full animate-pulse-slow"></div>
    <div class="absolute -bottom-10 right-10 w-96 h-96 bg-indigo-300 opacity-30 blur-3xl rounded-full animate-pulse-slow"></div>


    <h2 class="text-5xl font-bold text-center mb-16 tracking-wide drop-shadow animate-fade-in text-gray-800">
      <span class="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Mes Compétences
      </span>
    </h2>

    <div class="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
      <div
        v-for="(skill, i) in skills"
        :key="skill.name"
        :class="[
          'flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/40 border border-white/30 transition-all duration-500',
          'hover:shadow-2xl hover:-translate-y-2 hover:scale-110 hover:rotate-1',
          i % 4 === 0 ? 'rotate-[-2deg]' : '',
          i % 4 === 1 ? 'rotate-[1deg]' : '',
          i % 4 === 2 ? 'rotate-[-1deg]' : '',
          i % 4 === 3 ? 'rotate-[2deg]' : '',
        ]"
      >
        <img
          :src="skill.icon"
          :alt="skill.name"
          class="w-16 h-16 mb-4 transition-transform duration-300"
          loading="lazy"
        />
        <p class="text-gray-700 font-semibold">{{ skill.name }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>

const skills = [
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Nuxt.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
]
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
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
</style>
