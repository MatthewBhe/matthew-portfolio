<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import emailjs from '@emailjs/browser'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

const sending = ref(false)
const ok = ref(false)
const err = ref('')

// --- Honeypot (champ invisible) ---
const hp = ref('') // si rempli => bot

// --- reCAPTCHA ---
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const recaptchaBox = ref(null)
let recaptchaWidgetId = null
let recaptchaPoll = null

function renderRecaptcha() {
  if (!siteKey) {
    console.warn('VITE_RECAPTCHA_SITE_KEY manquante — active le captcha pour un meilleur anti-spam.')
    return
  }
  if (recaptchaWidgetId !== null) return
  if (window.grecaptcha && recaptchaBox.value) {
    recaptchaWidgetId = window.grecaptcha.render(recaptchaBox.value, {
      sitekey: siteKey,
      theme: 'dark',
      size: 'normal'
    })
  }
}

onMounted(() => {
  let tries = 0
  recaptchaPoll = setInterval(() => {
    tries++
    renderRecaptcha()
    if (recaptchaWidgetId !== null || tries > 60) clearInterval(recaptchaPoll)
  }, 100)
})
onBeforeUnmount(() => clearInterval(recaptchaPoll))

const mountedAt = Date.now()
const MIN_FILL_MS = 3000 // min 3s avant envoi

// --- Rate limit (localStorage) ---
const COOLDOWN_MS = 5 * 60 * 1000   // 5 minutes entre deux envois
const MAX_PER_10MIN = 5             // par ex., max 2 envois sur 10 minutes
const WINDOW_MS = 10 * 60 * 1000


function withinRateLimit() {
  const now = Date.now()
  const key = 'contact_rl'
  const raw = localStorage.getItem(key)
  let events = []
  try { events = raw ? JSON.parse(raw) : [] } catch { events = [] }
  // purge
  events = events.filter(t => now - t < WINDOW_MS)
  if (events.length >= MAX_PER_10MIN) return false
  const last = events[events.length - 1]
  if (last && now - last < COOLDOWN_MS) return false
  // push et save
  events.push(now)
  localStorage.setItem(key, JSON.stringify(events))
  return true
}

function looksHuman() {
  if (name.value.trim().length < 2) return false
  if (!/\S+@\S+\.\S+/.test(email.value)) return false
  if (message.value.trim().length < 10) return false
  const links = (message.value.match(/https?:\/\/|www\./gi) || []).length
  if (links > 3) return false
  return true
}

async function sendEmail() {
  err.value = ''
  ok.value = false

  // Honeypot
  if (hp.value) {
    err.value = 'Action bloquée.'
    return
  }

  if (Date.now() - mountedAt < MIN_FILL_MS) {
    err.value = 'Merci de vérifier votre message avant envoi.'
    return
  }

  if (!withinRateLimit()) {
    err.value = 'Trop de tentatives, réessayez dans quelques secondes.'
    return
  }

  if (!looksHuman()) {
    err.value = 'Veuillez remplir correctement les champs.'
    return
  }

  let token = ''
  try {
    if (recaptchaWidgetId !== null && window.grecaptcha) {
      token = window.grecaptcha.getResponse(recaptchaWidgetId)
    }
  } catch (_) {}
  if (siteKey && !token) {
    err.value = 'Merci de cocher le reCAPTCHA.'
    return
  }

  sending.value = true
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: name.value,
        email: email.value,
        subject: subject.value || 'Contact portfolio',
        message: message.value,
        time: new Date().toLocaleString(),
        'g-recaptcha-response': token 
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    )
    ok.value = true
    // reset
    name.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
    if (recaptchaWidgetId !== null && window.grecaptcha) {
      window.grecaptcha.reset(recaptchaWidgetId)
    }
  } catch (e) {
    console.error(e)
    err.value = "Échec de l’envoi. Réessayez plus tard."
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form @submit.prevent="sendEmail" class="space-y-4">
    <input v-model="hp" type="text" tabindex="-1" autocomplete="off"
           class="hidden" aria-hidden="true" />

    <div class="grid sm:grid-cols-2 gap-3">
      <input v-model="name"  type="text"  placeholder="Votre nom *"
             class="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-accent" />
      <input v-model="email" type="email" placeholder="Votre email *"
             class="rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-accent" />
    </div>

    <input v-model="subject" type="text" placeholder="Sujet"
           class="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-accent" />

    <textarea v-model="message" rows="5" placeholder="Votre message * (min. 10 caractères)"
              class="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 resize-y outline-none focus:border-brand-accent"></textarea>

    <div v-if="siteKey" class="mt-1 flex justify-center">
      <div ref="recaptchaBox"></div>
    </div>

    <div class="flex items-center gap-3">
      <button type="submit" :disabled="sending"
              class="btn btn--primary btn--glare min-w-40 disabled:opacity-50 active:scale-[.98] transition">
        {{ sending ? 'Envoi…' : 'Envoyer' }}
      </button>
      <span v-if="ok" class="text-emerald-400 text-sm">Message envoyé ✅</span>
      <span v-if="err" class="text-red-400 text-sm">{{ err }}</span>
    </div>
  </form>
</template>
