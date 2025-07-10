<script setup lang="ts">
// Scroll functions
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
  <section id="hero-section" class="relative h-screen overflow-hidden text-white flex flex-col justify-center items-center">
    <!-- Static nebula-inspired background -->
    <div class="absolute inset-0 background-gradient"></div>

    <!-- Decorative planets -->
    <div class="absolute planet planet-1"></div>
    <div class="absolute planet planet-2"></div>

    <!-- Hero content with neon glow effect -->
    <div class="relative z-10 w-full flex flex-col items-center text-center hero-content">
      <h2 class="text-5xl font-semibold mb-2 tracking-wider neon">MATTHEW</h2>
      <h1 class="text-9xl font-bold tracking-tight mb-4 neon">BONHOMME</h1>
      <p class="max-w-xl px-4 mb-8 animate-fadeInText">
        Étudiant en développement web, passionné par les interfaces créatives,
        l’expérience utilisateur et les défis techniques. Curieux de nature,
        j’aime explorer de nouvelles technologies et repousser mes limites.
      </p>
      <div class="inline-flex animate-buttons">
        <button @click="scrollToProjects" class="btn-hero">Mes projets</button>
        <button @click="scrollToComp" class="btn-hero">Compétences</button>
        <button @click="scrollToAbout" class="btn-hero">À propos</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Static nebula gradient with violet accents */
.background-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 40% 40%, rgba(75,0,130,0.6), transparent 70%),
              radial-gradient(circle at 60% 60%, rgba(148,0,211,0.5), transparent 70%),
              linear-gradient(45deg, #0d001f, #1b002e);
  background-blend-mode: screen;
}

/* Decorative planets styling */
.planet {
  border-radius: 50%;
  opacity: 0.9;
}
.planet-1 {
  width: 200px;
  height: 200px;
  bottom: 10%;
  left: 5%;
  background: radial-gradient(circle at 30% 30%, #7b1fa2, #4a0072);
  box-shadow: 0 0 20px rgba(123,31,162,0.7);
}
.planet-2 {
  width: 150px;
  height: 150px;
  top: 15%;
  right: 8%;
  background: radial-gradient(circle at 40% 40%, #ba68c8, #8e24aa);
  box-shadow: 0 0 15px rgba(186,104,200,0.6);
}

/* Neon glow effect for headings */
.neon {
  color: #e0c3fc;
  text-shadow:
    0 0 4px #e0c3fc,
    0 0 8px #ba68c8,
    0 0 12px #9c27b0,
    0 0 16px #7b1fa2,
    0 0 24px rgba(123,31,162,0.6);
  animation: neonPulse 2s ease-in-out infinite alternate;
}
@keyframes neonPulse {
  from {
    text-shadow:
      0 0 2px #e0c3fc,
      0 0 6px #ba68c8,
      0 0 8px #9c27b0,
      0 0 12px #7b1fa2,
      0 0 18px rgba(123,31,162,0.4);
  }
  to {
    text-shadow:
      0 0 8px #e0c3fc,
      0 0 12px #ba68c8,
      0 0 16px #9c27b0,
      0 0 20px #7b1fa2,
      0 0 28px rgba(123,31,162,0.8);
  }
}

/* Content fade-in animations */
.hero-content h2,
.hero-content h1 {
  animation: fadeUp 1s ease both;
}
.hero-content h2 { animation-delay: 0.5s; }
.hero-content h1 { animation-delay: 0.8s; }
.animate-fadeInText {
  animation: fadeUp 1s ease both;
  animation-delay: 1.1s;
}
.animate-buttons {
  display: inline-flex;
  gap: 0.5rem;
  animation: fadeUp 1s ease both;
  animation-delay: 1.4s;
}
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Hero buttons styling unchanged */
.btn-hero {
  padding: 0.75rem 1.5rem;
  margin: 0 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, background 0.3s ease;
}
.btn-hero:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}
</style>
