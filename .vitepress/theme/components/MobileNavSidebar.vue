<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme, page } = useData()
const route = useRoute()

const sidebar = computed(() => {
  const sidebarConfig = theme.value.sidebar
  if (!sidebarConfig) return []
  const path = page.value.relativePath
  if (Array.isArray(sidebarConfig)) return sidebarConfig

  const keys = Object.keys(sidebarConfig).sort((a, b) => b.length - a.length)
  for (const key of keys) {
    if (path.startsWith(key.replace(/^\//, ''))) {
      return sidebarConfig[key]
    }
  }

  const first = keys[0]
  return first ? sidebarConfig[first] : []
})

function isActive(link?: string): boolean {
  if (!link) return false
  return route.path === link || route.path === `${link}.html` || route.path.startsWith(`${link}/`)
}
</script>

<template>
  <nav v-if="sidebar.length" class="mobile-sidebar-nav">
    <div
      v-for="group in sidebar"
      :key="(group as any).text ?? ''"
      class="mobile-sidebar-group"
    >
      <p v-if="(group as any).text" class="mobile-sidebar-group__title">
        {{ (group as any).text }}
      </p>
      <ul class="mobile-sidebar-items">
        <li
          v-for="item in (group as any).items ?? []"
          :key="(item as any).link ?? (item as any).text"
          class="mobile-sidebar-item"
        >
          <a
            v-if="(item as any).link"
            :href="(item as any).link"
            class="mobile-sidebar-link"
            :class="{ 'is-active': isActive((item as any).link) }"
          >
            {{ (item as any).text }}
          </a>
          <span v-else class="mobile-sidebar-label">{{ (item as any).text }}</span>
          <ul v-if="(item as any).items?.length" class="mobile-sidebar-items mobile-sidebar-items--nested">
            <li
              v-for="sub in (item as any).items"
              :key="(sub as any).link ?? (sub as any).text"
              class="mobile-sidebar-item"
            >
              <a
                v-if="(sub as any).link"
                :href="(sub as any).link"
                class="mobile-sidebar-link mobile-sidebar-link--nested"
                :class="{ 'is-active': isActive((sub as any).link) }"
              >
                {{ (sub as any).text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.mobile-sidebar-nav {
  padding-bottom: 8px;
}

.mobile-sidebar-group {
  margin-bottom: 20px;
}

.mobile-sidebar-group__title {
  margin: 0 0 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.mobile-sidebar-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-sidebar-items--nested {
  margin-top: 2px;
  padding-left: 12px;
}

.mobile-sidebar-item {
  margin: 0;
}

.mobile-sidebar-link {
  display: block;
  padding: 5px 0;
  color: var(--vp-c-text-1);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.mobile-sidebar-link:hover,
.mobile-sidebar-link.is-active {
  color: var(--vp-c-brand-1);
}

.mobile-sidebar-link.is-active {
  font-weight: 500;
}

.mobile-sidebar-link--nested {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.mobile-sidebar-label {
  display: block;
  padding: 5px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
