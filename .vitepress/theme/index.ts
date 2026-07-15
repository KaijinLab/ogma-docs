import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import { defineComponent, h, nextTick, provide } from 'vue'
import HomeHero from './components/HomeHero.vue'
import MobileNavSidebar from './components/MobileNavSidebar.vue'
import './custom.css'

const OgmaDocsLayout = defineComponent({
  name: 'OgmaDocsLayout',
  setup() {
    const { isDark } = useData()

    const canUseViewTransitions = () =>
      typeof document !== 'undefined'
      && 'startViewTransition' in document
      && window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    const toggleAppearance = async (event?: MouseEvent) => {
      if (!canUseViewTransitions()) {
        isDark.value = !isDark.value
        return
      }

      event?.preventDefault()
      const goingDark = !isDark.value
      const x = event?.clientX ?? window.innerWidth / 2
      const y = event?.clientY ?? window.innerHeight / 2
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      await (document as Document & {
        startViewTransition: (callback: () => Promise<void>) => { ready: Promise<void> }
      }).startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
      }).ready

      document.documentElement.animate(
        { clipPath: goingDark ? clipPath : clipPath.slice().reverse() },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: `::view-transition-${goingDark ? 'new' : 'old'}(root)`,
        },
      )
    }

    provide('toggle-appearance', toggleAppearance)

    return () => h(DefaultTheme.Layout, null, {
      'nav-screen-content-before': () => h(MobileNavSidebar),
    })
  },
})

export default {
  extends: DefaultTheme,
  Layout: OgmaDocsLayout,
  enhanceApp({ app, router }) {
    app.component('HomeHero', HomeHero)
    app.component('MobileNavSidebar', MobileNavSidebar)

    // Image protection: disable right-click save and drag-and-drop on images
    if (typeof window !== 'undefined') {
      const protect = () => {
        // Block contextmenu (right-click) on images
        document.addEventListener('contextmenu', (e) => {
          if ((e.target as HTMLElement).tagName === 'IMG') {
            e.preventDefault()
          }
        }, true)
        // Block drag start on images (prevents drag-to-desktop)
        document.addEventListener('dragstart', (e) => {
          if ((e.target as HTMLElement).tagName === 'IMG') {
            e.preventDefault()
          }
        }, true)
        // CSS pointer-events alone isn't enough, but add user-select: none for good measure
        const style = document.createElement('style')
        style.textContent = 'img { -webkit-user-drag: none; user-drag: none; }'
        document.head.appendChild(style)
      }
      protect()
      router.onAfterRouteChanged = protect
    }
  },
} satisfies Theme
