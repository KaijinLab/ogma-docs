<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, nextTick, onMounted, ref } from 'vue'

const { isDark } = useData()

const modal = ref<HTMLElement | null>(null)
const isPreviewOpen = ref(false)
const zoom = ref(1)

const screenshotSrc = computed(() => (
  isDark.value ? '/ogma-home-page-dark.png' : '/ogma-home-page-light.png'
))

const logoSrc = computed(() => (
  isDark.value ? '/logo-ogma-dark.svg' : '/logo-ogma-light.svg'
))

const zoomPercent = computed(() => `${Math.round(zoom.value * 100)}%`)
const modalImageWidth = computed(() => `${Math.round(1600 * zoom.value)}px`)

const openPreview = async () => {
  isPreviewOpen.value = true
  await nextTick()
  modal.value?.focus()
}

const closePreview = () => {
  isPreviewOpen.value = false
  zoom.value = 1
}

const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 0.2, 2)
}

const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 0.2, 0.6)
}

const resetZoom = () => {
  zoom.value = 1
}

// ── Download button with OS detection ────────────────────────────────────────

const VERSION = '0.1.0'
const BASE = `https://github.com/KaijinLab/ogma/releases/download/v${VERSION}`
const RELEASES = 'https://github.com/KaijinLab/ogma/releases/latest'

type OS = 'windows' | 'mac' | 'linux'

interface DownloadOption {
  label: string
  url: string
  note?: string
}

const detectedOS = ref<OS>('linux')
const altOpen = ref(false)

onMounted(() => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) detectedOS.value = 'windows'
  else if (ua.includes('mac')) detectedOS.value = 'mac'
  else detectedOS.value = 'linux'
})

const primaryDownload = computed<DownloadOption>(() => {
  if (detectedOS.value === 'windows') {
    return { label: 'Download for Windows', url: `${BASE}/Ogma-${VERSION}-windows-x64-setup.exe`, note: 'Windows x64 installer' }
  }
  if (detectedOS.value === 'mac') {
    // Detect Apple Silicon vs Intel
    const isArm = navigator.userAgent.includes('Mac') && (navigator as any).userAgentData?.architecture === 'arm'
    return isArm
      ? { label: 'Download for macOS', url: `${BASE}/Ogma-${VERSION}-mac-arm64.dmg`, note: 'Apple Silicon (M1/M2/M3)' }
      : { label: 'Download for macOS', url: `${BASE}/Ogma-${VERSION}-mac-x64.dmg`, note: 'Intel Mac' }
  }
  return { label: 'Download for Linux', url: `${BASE}/Ogma-${VERSION}-linux-x64.AppImage`, note: 'Linux x64 AppImage' }
})

const allDownloads = computed<Record<OS, DownloadOption[]>>(() => ({
  windows: [
    { label: 'Windows x64 installer (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-x64-setup.exe` },
    { label: 'Windows x64 portable (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-x64-portable.exe` },
    { label: 'Windows ARM64 installer (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-arm64-setup.exe` },
    { label: 'Windows ARM64 portable (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-arm64-portable.exe` },
  ],
  mac: [
    { label: 'macOS Apple Silicon (.dmg)', url: `${BASE}/Ogma-${VERSION}-mac-arm64.dmg` },
    { label: 'macOS Intel (.dmg)', url: `${BASE}/Ogma-${VERSION}-mac-x64.dmg` },
    { label: 'macOS Apple Silicon (.zip)', url: `${BASE}/Ogma-${VERSION}-mac-arm64.zip` },
    { label: 'macOS Intel (.zip)', url: `${BASE}/Ogma-${VERSION}-mac-x64.zip` },
  ],
  linux: [
    { label: 'Linux x64 AppImage', url: `${BASE}/Ogma-${VERSION}-linux-x64.AppImage` },
    { label: 'Linux x64 .deb', url: `${BASE}/Ogma-${VERSION}-linux-x64.deb` },
    { label: 'Linux ARM64 AppImage', url: `${BASE}/Ogma-${VERSION}-linux-arm64.AppImage` },
  ],
}))

const otherOS = computed<{ label: string; os: OS }[]>(() => {
  const all: { label: string; os: OS }[] = [
    { label: 'Windows', os: 'windows' },
    { label: 'macOS', os: 'mac' },
    { label: 'Linux', os: 'linux' },
  ]
  return all.filter(o => o.os !== detectedOS.value)
})

function toggleAlt() {
  altOpen.value = !altOpen.value
}

function closeAlt() {
  altOpen.value = false
}

// Click-outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    el._clickOutsideHandler = (e: Event) => {
      if (!el.contains(e.target as Node)) binding.value()
    }
    document.addEventListener('click', el._clickOutsideHandler, true)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el._clickOutsideHandler, true)
  },
}
</script>

<template>
  <section class="home-hero" aria-label="Ogma landing page">
    <div class="home-hero__motion" aria-hidden="true"></div>
    <div class="home-hero__stem" aria-hidden="true"></div>

    <div class="home-hero__content">
      <div class="home-hero__copy">
        <div class="home-hero__brand">
          <img class="home-hero__logo" :src="logoSrc" alt="">
          <span>Ogma</span>
        </div>
        <p class="home-hero__headline">A lightweight, open-source local proxy for web security testing.</p>
        <p class="home-hero__line">
          Intercept, replay, scan, automate, and extend HTTP workflows from one lightweight desktop app.
        </p>

        <nav class="home-hero__actions" aria-label="Download and documentation links">

          <!-- Primary download: auto-detected OS -->
          <div class="dl-group">
            <a class="ogma-button ogma-button--primary dl-primary" :href="primaryDownload.url" download>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16l-5-5 1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11l-5 5zm-7 2h14v2H5v-2z"/></svg>
              {{ primaryDownload.label }}
            </a>
            <button
              class="dl-alt-toggle"
              :aria-expanded="altOpen"
              aria-haspopup="listbox"
              @click="toggleAlt"
              :title="`Other downloads for ${detectedOS}`"
            >
              <span class="dl-alt-note">{{ primaryDownload.note }}</span>
              <svg class="dl-alt-chevron" :class="{ 'dl-alt-chevron--open': altOpen }" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5"/></svg>
            </button>

            <!-- Dropdown: all variants for detected OS + links to other OSes -->
            <div v-if="altOpen" class="dl-dropdown" role="listbox" v-click-outside="closeAlt">
              <div class="dl-dropdown__section">
                <div class="dl-dropdown__heading">{{ detectedOS === 'windows' ? 'Windows' : detectedOS === 'mac' ? 'macOS' : 'Linux' }}</div>
                <a
                  v-for="opt in allDownloads[detectedOS]"
                  :key="opt.url"
                  class="dl-dropdown__item"
                  :href="opt.url"
                  download
                  @click="closeAlt"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16l-5-5 1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11l-5 5zm-7 2h14v2H5v-2z"/></svg>
                  {{ opt.label }}
                </a>
              </div>
              <div class="dl-dropdown__divider"></div>
              <div class="dl-dropdown__section">
                <div class="dl-dropdown__heading">Other platforms</div>
                <div v-for="os in otherOS" :key="os.os">
                  <a
                    v-for="opt in allDownloads[os.os].slice(0, 1)"
                    :key="opt.url"
                    class="dl-dropdown__item"
                    :href="opt.url"
                    download
                    @click="closeAlt"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16l-5-5 1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11l-5 5zm-7 2h14v2H5v-2z"/></svg>
                    {{ opt.label }}
                  </a>
                </div>
                <a class="dl-dropdown__item dl-dropdown__item--muted" :href="RELEASES" target="_blank" rel="noopener" @click="closeAlt">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8l-3.5-3.5-5 5L11 11l5-5L12.5 3H21z"/></svg>
                  All releases on GitHub
                </a>
              </div>
            </div>
          </div>

          <a class="ogma-button" href="/introduction">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5C5 3.7 5.7 3 6.5 3H20v16.5c0 .8-.7 1.5-1.5 1.5H6.7A2.7 2.7 0 0 1 4 18.3V5.5c0-.6.4-1 1-1Zm1 11.2c.2 0 .5-.1.7-.1H18V5H7v10.6H6Zm.7 1.9a.7.7 0 0 0 0 1.4H18v-1.4H6.7Z"/></svg>
            Read docs
          </a>
        </nav>
      </div>

      <div class="home-hero__visual" aria-label="Ogma application preview">
        <div class="home-hero__frame">
          <div class="home-hero__frame-bar" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            class="home-hero__shot-scroll"
            role="button"
            tabindex="0"
            aria-label="Open enlarged Ogma interface screenshot"
            @click="openPreview"
            @keydown.enter="openPreview"
            @keydown.space.prevent="openPreview"
          >
            <img
              class="home-hero__shot"
              :src="screenshotSrc"
              alt="Ogma HTTP History with request and response inspectors"
            >
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isPreviewOpen"
        ref="modal"
        class="home-preview"
        role="dialog"
        aria-modal="true"
        aria-label="Ogma interface preview"
        tabindex="-1"
        @click.self="closePreview"
        @keydown.esc="closePreview"
      >
        <div class="home-preview__panel">
          <div class="home-preview__toolbar">
            <span>Ogma interface preview</span>
            <div class="home-preview__controls" aria-label="Preview controls">
              <button type="button" @click="zoomOut">-</button>
              <button type="button" @click="resetZoom">{{ zoomPercent }}</button>
              <button type="button" @click="zoomIn">+</button>
              <button type="button" @click="closePreview">Close</button>
            </div>
          </div>
          <div class="home-preview__viewport" tabindex="0">
            <img
              class="home-preview__image"
              :src="screenshotSrc"
              :style="{ width: modalImageWidth }"
              alt="Expanded Ogma HTTP History with request and response inspectors"
            >
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  display: grid;
  place-items: center;
  height: calc(100vh - var(--vp-nav-height));
  min-height: 0;
  overflow: hidden;
  padding: clamp(22px, 4vw, 58px);
}

.home-hero__stem {
  position: absolute;
  z-index: 1;
  left: max(18px, 4.8vw);
  top: 16%;
  bottom: 16%;
  width: 2px;
  background: var(--ogma-stem);
}

.home-hero__motion {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.home-hero__motion::before,
.home-hero__motion::after {
  content: '';
  position: absolute;
  inset: -64px;
  will-change: transform;
}

.home-hero__motion::before {
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ogma-stem) 34%, transparent) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.36;
  animation: ogma-grid-drift 34s linear infinite;
}

.home-hero__motion::after {
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-brand-1) 48%, transparent) 1px, transparent 1.7px);
  background-size: 108px 108px;
  opacity: 0.26;
  animation: ogma-dot-drift 46s linear infinite;
}

@keyframes ogma-grid-drift {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(72px, 72px, 0);
  }
}

@keyframes ogma-dot-drift {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-108px, 54px, 0);
  }
}

.home-hero__stem::before,
.home-hero__stem::after {
  content: '';
  position: absolute;
  left: 0;
  width: 36px;
  height: 2px;
  background: var(--vp-c-brand-1);
}

.home-hero__stem::before {
  top: 34%;
}

.home-hero__stem::after {
  top: 47%;
}

.home-hero__content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(330px, 0.78fr) minmax(520px, 1.22fr);
  align-items: center;
  gap: clamp(34px, 4.5vw, 72px);
  width: min(1360px, 100%);
  min-height: 0;
  margin: 0 auto;
}

.home-hero__copy {
  min-width: 0;
}

.home-hero__brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 22px;
  color: var(--vp-c-text-1);
  font-size: 34px;
  font-weight: 650;
  letter-spacing: 0;
  line-height: 1;
}

.home-hero__logo {
  width: 76px;
  height: auto;
}

.home-hero__headline {
  max-width: 560px;
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(30px, 3.25vw, 48px);
  font-weight: 650;
  letter-spacing: 0;
  line-height: 1.08;
}

.home-hero__line {
  max-width: 520px;
  margin: 20px 0 0;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.55;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

.home-hero__visual {
  min-width: 0;
}

.home-hero__frame {
  position: relative;
  display: grid;
  grid-template-rows: 34px minmax(0, 1fr);
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.home-hero__frame::before {
  content: '';
  position: absolute;
  left: -13px;
  top: -13px;
  width: 64px;
  height: 2px;
  background: var(--vp-c-brand-1);
}

.home-hero__frame::after {
  content: '';
  position: absolute;
  left: -13px;
  top: -13px;
  width: 2px;
  height: 64px;
  background: var(--vp-c-brand-1);
}

.home-hero__frame-bar {
  display: flex;
  gap: 7px;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-border);
  padding: 0 14px;
  background: var(--vp-c-bg);
}

.home-hero__frame-bar span {
  width: 8px;
  height: 8px;
  border: 1px solid var(--vp-c-border);
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
}

.home-hero__shot-scroll {
  display: grid;
  aspect-ratio: 1920 / 1016;
  min-height: 0;
  place-items: center;
  overflow: hidden;
}

.home-hero__shot {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
  user-select: none;
}

.home-preview {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(17 16 9 / 78%);
}

.home-preview__panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(1500px, 100%);
  height: min(900px, 100%);
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.home-preview__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--vp-c-border);
  padding: 10px 12px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 700;
}

.home-preview__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.home-preview__controls button {
  min-width: 36px;
  border: 1px solid var(--vp-c-border);
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 12px;
  font-weight: 700;
}

.home-preview__controls button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.home-preview__viewport {
  min-height: 0;
  overflow: auto;
  background: var(--vp-c-bg-soft);
  scrollbar-color: var(--vp-c-brand-1) transparent;
  scrollbar-width: thin;
}

.home-preview__image {
  display: block;
  max-width: none;
  height: auto;
}

@media (max-width: 1120px) {
  .home-hero__content {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: center;
  }

  .home-hero__logo {
    margin-right: 0;
    margin-left: 0;
  }

  .home-hero__brand {
    margin-right: auto;
    margin-left: auto;
  }

  .home-hero__headline,
  .home-hero__line {
    margin-right: auto;
    margin-left: auto;
  }

  .home-hero__actions {
    justify-content: center;
  }

  .home-hero__visual {
    width: min(820px, 100%);
    margin: 0 auto;
  }

  .home-hero__frame {
    width: min(820px, 100%);
  }
}

@media (max-width: 720px) {
  .home-hero {
    padding: 14px;
  }

  .home-hero__stem {
    display: none;
  }

  .home-hero__brand {
    gap: 10px;
    margin-bottom: 14px;
    font-size: 28px;
  }

  .home-hero__logo {
    width: 58px;
  }

  .home-hero__headline {
    font-size: clamp(26px, 8vw, 34px);
  }

  .home-hero__line {
    margin-top: 12px;
    font-size: 14px;
  }

  .home-hero__actions {
    margin-top: 16px;
  }

  .home-hero__actions .ogma-button {
    flex: 1 1 132px;
  }

  .home-hero__frame {
    width: 100%;
  }

  .home-preview {
    padding: 10px;
  }

  .home-preview__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-height: 720px) {
  .home-hero__brand {
    margin-bottom: 10px;
    font-size: 28px;
  }

  .home-hero__logo {
    width: 58px;
  }

  .home-hero__headline {
    font-size: clamp(26px, 3vw, 40px);
  }

  .home-hero__line {
    margin-top: 12px;
  }

  .home-hero__actions {
    margin-top: 16px;
  }

  .home-hero__visual {
    width: min(760px, 100%);
  }
}

@media (max-width: 720px) and (max-height: 720px) {
  .home-hero__visual {
    width: min(520px, 100%);
  }
}

/* ── Download group ─────────────────────────────────────────────────────── */
.dl-group {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  border-radius: 8px;
}

.dl-primary {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding-right: 14px;
}

.dl-alt-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  border: 1px solid var(--vp-button-brand-border, rgba(255,255,255,.15));
  border-left: 1px solid rgba(255,255,255,.15);
  border-radius: 0 8px 8px 0;
  background: var(--vp-button-brand-bg, var(--vp-c-brand-1));
  color: var(--vp-button-brand-text, #fff);
  cursor: pointer;
  font-size: 11px;
  line-height: 1;
  transition: background 0.2s;
}

.dl-alt-toggle:hover {
  background: var(--vp-button-brand-hover-bg, var(--vp-c-brand-2));
}

.dl-alt-note {
  opacity: 0.75;
  font-size: 10px;
  white-space: nowrap;
}

.dl-alt-chevron {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  transition: transform 0.2s;
}

.dl-alt-chevron--open {
  transform: rotate(180deg);
}

.dl-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 260px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,.18);
  z-index: 100;
  overflow: hidden;
}

.dl-dropdown__section {
  padding: 6px 0;
}

.dl-dropdown__heading {
  padding: 4px 14px 2px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--vp-c-text-3);
}

.dl-dropdown__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background 0.15s;
  cursor: pointer;
}

.dl-dropdown__item svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  fill: currentColor;
  opacity: 0.6;
}

.dl-dropdown__item:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.dl-dropdown__item--muted {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.dl-dropdown__divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 0 10px;
}

@media (max-width: 480px) {
  .dl-dropdown {
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
  }
  .dl-alt-note {
    display: none;
  }
}
</style>
