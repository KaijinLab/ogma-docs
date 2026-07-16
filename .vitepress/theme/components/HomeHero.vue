<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, nextTick, onMounted, ref } from 'vue'

const { isDark } = useData()

const modal = ref<HTMLElement | null>(null)
const isPreviewOpen = ref(false)
const zoom = ref(1)

const screenshotSrc = computed(() => (
  isDark.value ? '/ogma-home-page-dark.webp' : '/ogma-home-page-light.webp'
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
const BASE = `https://github.com/KaijinLab/ogma-releases/releases/download/v${VERSION}`
const RELEASES = 'https://github.com/KaijinLab/ogma-releases/releases/latest'

type OS = 'windows' | 'mac' | 'linux'

interface DownloadOption {
  label: string
  url: string
  note?: string
}

type Arch = 'x64' | 'arm64'

const detectedOS = ref<OS>('linux')
const selectedOS = ref<OS>('linux')
const detectedArch = ref<Arch>('x64')
const selectedArch = ref<Arch>('x64')

onMounted(async () => {
  const ua = navigator.userAgent.toLowerCase()
  const os: OS = ua.includes('win') ? 'windows' : ua.includes('mac') ? 'mac' : 'linux'
  detectedOS.value = os
  selectedOS.value = os

  // Detect architecture
  let arch: Arch = 'x64'
  try {
    // Modern browsers: navigator.userAgentData (Chrome/Edge)
    const uad = (navigator as any).userAgentData
    if (uad?.getHighEntropyValues) {
      const hints = await uad.getHighEntropyValues(['architecture'])
      if (hints.architecture === 'arm') arch = 'arm64'
    } else {
      // Fallback: Apple Silicon Macs always run browsers in arm mode;
      // Windows on ARM often includes 'arm' in the UA
      if (ua.includes('arm') || ua.includes('aarch64')) arch = 'arm64'
      // macOS with no architecture hint: assume Apple Silicon for M-series era
      if (os === 'mac' && !ua.includes('intel')) arch = 'arm64'
    }
  } catch {}
  detectedArch.value = arch
  selectedArch.value = arch
})

// Downloads per OS per arch, with primary first
interface ArchDownloads {
  primary: DownloadOption
  extras: DownloadOption[]
}

const downloads = computed<Record<OS, Record<Arch, ArchDownloads>>>(() => ({
  windows: {
    x64: {
      primary: { label: 'Download installer  (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-x64-setup.exe` },
      extras: [
        { label: 'Portable  (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-x64-portable.exe` },
      ],
    },
    arm64: {
      primary: { label: 'Download installer  (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-arm64-setup.exe` },
      extras: [
        { label: 'Portable  (.exe)', url: `${BASE}/Ogma-${VERSION}-windows-arm64-portable.exe` },
      ],
    },
  },
  mac: {
    arm64: {
      primary: { label: 'Download  (.dmg)', url: `${BASE}/Ogma-${VERSION}-mac-arm64.dmg` },
      extras: [
        { label: 'ZIP archive', url: `${BASE}/Ogma-${VERSION}-mac-arm64.zip` },
      ],
    },
    x64: {
      primary: { label: 'Download  (.dmg)', url: `${BASE}/Ogma-${VERSION}-mac-x64.dmg` },
      extras: [
        { label: 'ZIP archive', url: `${BASE}/Ogma-${VERSION}-mac-x64.zip` },
      ],
    },
  },
  linux: {
    x64: {
      primary: { label: 'Download AppImage', url: `${BASE}/Ogma-${VERSION}-linux-x64.AppImage` },
      extras: [
        { label: 'Debian / Ubuntu  (.deb)', url: `${BASE}/Ogma-${VERSION}-linux-x64.deb` },
      ],
    },
    arm64: {
      primary: { label: 'Download AppImage', url: `${BASE}/Ogma-${VERSION}-linux-arm64.AppImage` },
      extras: [],
    },
  },
}))

const currentDownloads = computed(() => downloads.value[selectedOS.value][selectedArch.value])

// Which arch labels to show for the selected OS
const archOptions = computed<{ value: Arch; label: string }[]>(() => {
  if (selectedOS.value === 'windows') return [{ value: 'x64', label: 'x64' }, { value: 'arm64', label: 'ARM64' }]
  if (selectedOS.value === 'mac') return [{ value: 'arm64', label: 'Apple Silicon' }, { value: 'x64', label: 'Intel' }]
  return [{ value: 'x64', label: 'x64' }, { value: 'arm64', label: 'ARM64' }]
})

// Reset arch to best default when OS tab changes
function selectOS(os: OS) {
  selectedOS.value = os
  // For the detected OS, snap back to detected arch; otherwise pick sensible default
  if (os === detectedOS.value) {
    selectedArch.value = detectedArch.value
  } else if (os === 'mac') {
    selectedArch.value = 'arm64' // Apple Silicon is now the majority
  } else {
    selectedArch.value = 'x64'
  }
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
        <p class="home-hero__headline">A lightweight, local proxy for web security testing.</p>
        <p class="home-hero__line">
          Intercept, replay, scan, automate, and extend HTTP workflows from one lightweight desktop app.
        </p>

        <div class="dl-block">
          <!-- OS tabs -->
          <div class="dl-tabs" role="tablist" aria-label="Select platform">
            <button
              v-for="os in (['windows', 'mac', 'linux'] as OS[])"
              :key="os"
              class="dl-tab"
              :class="{ 'dl-tab--active': selectedOS === os }"
              role="tab"
              :aria-selected="selectedOS === os"
              @click="selectOS(os)"
            >
              <svg v-if="os === 'windows'" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M3 5.1 10.6 4v7.2H3V5.1Zm0 7.7h7.6V20L3 18.9v-6.1Zm9.2-9 8.8-1.3v8.7h-8.8V3.8Zm0 9H21v8.7l-8.8-1.3v-7.4Z"/></svg>
              <svg v-else-if="os === 'mac'" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.7 2.2c.1 1.1-.3 2.2-1.1 3.1-.8.9-1.9 1.5-3 1.4-.1-1.1.4-2.2 1.1-3 .8-.9 2-1.5 3-1.5ZM20.2 17c-.4 1-1 2-1.8 3-.9 1.2-1.9 2.5-3.3 2.5-1.3 0-1.7-.8-3.2-.8s-2 .8-3.2.8c-1.4 0-2.5-1.3-3.3-2.5-1.8-2.7-3.1-7.5-1.3-10.8.9-1.6 2.4-2.6 4.1-2.7 1.3 0 2.5.9 3.2.9.8 0 2.2-1.1 3.8-1 1.2 0 3 .5 4.1 2.2-3.6 2-3 7.1.9 8.4Z"/></svg>
              <img v-else src="/linux.svg" width="14" height="14" aria-hidden="true">
              {{ os === 'windows' ? 'Windows' : os === 'mac' ? 'macOS' : 'Linux' }}
              <span v-if="os === detectedOS" class="dl-tab__badge">Detected</span>
            </button>
          </div>

          <!-- Download panel -->
          <div class="dl-panel" role="tabpanel">

            <!-- Arch toggle pill -->
            <div class="dl-arch" role="group" :aria-label="`Architecture for ${selectedOS}`">
              <button
                v-for="a in archOptions"
                :key="a.value"
                class="dl-arch__btn"
                :class="{
                  'dl-arch__btn--active': selectedArch === a.value,
                  'dl-arch__btn--detected': a.value === detectedArch && selectedOS === detectedOS
                }"
                @click="selectedArch = a.value"
              >
                {{ a.label }}
                <span v-if="a.value === detectedArch && selectedOS === detectedOS" class="dl-arch__dot" aria-hidden="true"></span>
              </button>
            </div>

            <!-- Primary download button -->
            <a class="dl-primary-btn" :href="currentDownloads.primary.url" download>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 16l-5-5 1.41-1.41L11 13.17V4h2v9.17l3.59-3.58L18 11l-6 6zM5 18h14v2H5v-2z"/></svg>
              {{ currentDownloads.primary.label }}
            </a>

            <!-- Extra formats -->
            <div v-if="currentDownloads.extras.length" class="dl-extras">
              <span class="dl-extras__label">Also available:</span>
              <a
                v-for="opt in currentDownloads.extras"
                :key="opt.url"
                class="dl-extra-link"
                :href="opt.url"
                download
              >{{ opt.label }}</a>
              <a class="dl-extra-link dl-extra-link--releases" :href="RELEASES" target="_blank" rel="noopener">All releases ↗</a>
            </div>
            <div v-else class="dl-extras">
              <a class="dl-extra-link dl-extra-link--releases" :href="RELEASES" target="_blank" rel="noopener">All releases ↗</a>
            </div>

          </div>

          <div class="dl-divider" aria-hidden="true"></div>

          <a class="ogma-button" href="/introduction">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5C5 3.7 5.7 3 6.5 3H20v16.5c0 .8-.7 1.5-1.5 1.5H6.7A2.7 2.7 0 0 1 4 18.3V5.5c0-.6.4-1 1-1Zm1 11.2c.2 0 .5-.1.7-.1H18V5H7v10.6H6Zm.7 1.9a.7.7 0 0 0 0 1.4H18v-1.4H6.7Z"/></svg>
            Read docs
          </a>
        </div>
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

/* ── Download block ──────────────────────────────────────────────────────── */
.dl-block {
  margin-top: 28px;
}

/* Platform tabs */
.dl-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dl-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.dl-tab svg, .dl-tab img { width: 14px; height: 14px; opacity: 0.65; flex-shrink: 0; }
.dl-tab:hover { color: var(--vp-c-text-1); }
.dl-tab--active { color: var(--vp-c-brand-1); border-bottom-color: var(--vp-c-brand-1); font-weight: 600; }
.dl-tab--active svg, .dl-tab--active img { opacity: 1; }

.dl-tab__badge {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  padding: 1px 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  line-height: 1.4;
}

/* Download panel */
.dl-panel {
  padding: 14px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Arch toggle pill */
.dl-arch {
  display: inline-flex;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  width: fit-content;
}

.dl-arch__btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
}

.dl-arch__btn:last-child { border-right: none; }
.dl-arch__btn:hover { color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); }

.dl-arch__btn--active {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.dl-arch__dot {
  width: 5px;
  height: 5px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  display: inline-block;
}

/* Primary download button */
.dl-primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
  width: fit-content;
}

.dl-primary-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.dl-primary-btn:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #fff !important; /* force white text on hover in both themes */
}

/* Extra format links */
.dl-extras {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
}

.dl-extras__label {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.dl-extra-link {
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: color 0.12s, border-color 0.12s;
}

.dl-extra-link:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.dl-extra-link--releases { color: var(--vp-c-text-3); }
.dl-extra-link--releases:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-text-2); }

.dl-divider {
  width: 40px;
  height: 1px;
  background: var(--vp-c-divider);
  margin: 6px 0;
}
</style>
