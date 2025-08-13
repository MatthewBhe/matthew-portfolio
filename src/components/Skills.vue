<script setup>
import TiltedCard from "./ui/TiltedCard.vue"

const skills = [
  { name: "Java",           slug: "java",          color: "007396" },
  { name: "HTML5",          slug: "html5",         color: "E34F26" },
  { name: "CSS3",           slug: "css3",          color: "1572B6" },
  { name: "JavaScript",     slug: "javascript",    color: "F7DF1E" },
  { name: "Android Studio", slug: "androidstudio", color: "3DDC84" },
  { name: "Vue.js",         slug: "vuedotjs",      color: "4FC08D" },
  { name: "Nuxt.js",        slug: "nuxtdotjs",     color: "00DC82" },
  { name: "Node.js",        slug: "nodedotjs",     color: "339933" },
  { name: "C",              slug: "c",             color: "A8B9CC" },
  { name: "PHP",            slug: "php",           color: "777BB4" },
  { name: "Python",         slug: "python",        color: "3776AB" },
  { name: "GitHub",         slug: "github",        color: "FFFFFF" },
]

const DEVICON_SLUGS = {
  java: "java",
  html5: "html5",
  css3: "css3",
  javascript: "javascript",
  androidstudio: "androidstudio",
  vuedotjs: "vuejs",
  nuxtdotjs: "nuxtjs",
  nodedotjs: "nodejs",
  c: "c",
  php: "php",
  python: "python",
  github: null
}

const deviconUrl = (devSlug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${devSlug}/${devSlug}-original.svg`

const iconifyUrl = (slug, color = "FFFFFF") =>
  `https://api.iconify.design/simple-icons:${slug}.svg?color=%23${color}`

const iconUrl = (slug, color) => {
  const devSlug = DEVICON_SLUGS[slug]
  if (devSlug) return deviconUrl(devSlug)
  return iconifyUrl(slug, color)
}
</script>

<template>
  <section id="competences" class="section">
    <div class="container">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6" data-reveal>Mes Compétences</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <TiltedCard
            v-for="(s, i) in skills"
            :key="s.slug || i"
            :image-src="iconUrl(s.slug, s.color)"
            :alt-text="s.name"
            :caption-text="s.name"
            container-height="160px"
            image-height="140px"
            image-width="140px"
            :rotate-amplitude="14"
            :scale-on-hover="1.08"
            glare-color="#9B5CFF"
            :glare-opacity="0.28"
            :glare-angle="-35"
            :glare-duration="900"
          />
        </div>
    </div>
  </section>
</template>
