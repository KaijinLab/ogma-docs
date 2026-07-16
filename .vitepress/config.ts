import { defineConfig } from 'vitepress'

const siteTitle = 'Ogma'
const siteDescription = 'Documentation for Ogma, a local-first web security testing proxy with AI, MCP, automation, scanners, and plugins.'
const siteUrl = 'https://ogma.kaijinlab.com'
const githubUrl = 'https://github.com/KaijinLab/ogma-releases'

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replaceAll('<', '\\u003c')
}

function toCleanUrl(relativePath: string) {
  const cleanPath = relativePath
    .replace(/index\.md$/, '')
    .replace(/\.md$/, '')
    .replace(/\/$/, '')
  return cleanPath ? `${siteUrl}/${cleanPath}` : siteUrl
}

const coverByPage: Record<string, string> = {
  'index.md': 'home.png',
  'introduction.md': 'introduction.png',
  'getting-started.md': 'getting-started.png',
  'troubleshooting.md': 'troubleshooting.png',
  'app/automate.md': 'automate.png',
  'app/browser.md': 'ogma-browser.png',
  'app/endpoints.md': 'endpoints.png',
  'app/environment.md': 'environment.png',
  'app/exports.md': 'exports.png',
  'app/files.md': 'files.png',
  'app/filters.md': 'filters.png',
  'app/findings.md': 'findings.png',
  'app/http-history.md': 'http-history.png',
  'app/intercept.md': 'intercept.png',
  'app/match-replace.md': 'match-and-replace.png',
  'app/plugins.md': 'plugins.png',
  'app/replay.md': 'replay.png',
  'app/scope.md': 'scope.png',
  'app/search.md': 'search.png',
  'app/settings.md': 'settings.png',
  'app/sitemap.md': 'sitemap.png',
  'app/workflows.md': 'workflows.png',
  'app/ws-sse-history.md': 'websocket-and-sse-istory.png',
  'app/utilities/compare.md': 'compare.png',
  'app/utilities/decoder.md': 'decoder.png',
  'app/utilities/discovery.md': 'discovery.png',
  'app/utilities/jwt.md': 'jwt.png',
  'app/utilities/notes.md': 'notes.png',
  'app/utilities/oast.md': 'oast.png',
  'app/utilities/payloads.md': 'payloads.png',
  'app/utilities/race-smuggling.md': 'race-and-smuggling.png',
  'app/utilities/request-sequencer.md': 'request-sequencer.png',
  'app/utilities/reverse-shell.md': 'reverse-shell.png',
  'app/utilities/scanner.md': 'scanner.png',
  'app/utilities/token-analysis.md': 'token-analysis.png',
  'development/architecture.md': 'architecture.png',
  'guide/first-capture.md': 'first-capture.png',
  'guide/projects-data.md': 'projects-and-data.png',
  'guide/proxy-workflow.md': 'proxy-workflow.png',
  'guide/replay-automation.md': 'replay-and-automation.png',
  'guide/scanning.md': 'scanning.png',
  'guide/utilities.md': 'scanner.png',
  'guide/workspace-ai.md': 'workspace-ai.png',
  'mcp-setup.md': 'ogma-mcp.png',
  'plugins/README.md': 'ogma-plugin-system.png',
  'plugins/backend-sdk.md': 'plugin-backend-sdk.png',
  'plugins/frontend-sdk.md': 'plugin-frontend-sdk.png',
  'reference/cli.md': 'cli-reference.png',
  'reference/httpql.md': 'httpql-and-streamql.png',
  'reference/mcp-tools.md': 'mcp-resources-and-tools.png',
  'reference/vs-burpsuite.md': 'ogma-vs-burp-suite.png',
  'reference/vs-caido.md': 'ogma-vs-caido.png',
  'security.md': 'security-model.png',
}

function toCoverUrl(relativePath: string) {
  const cover = coverByPage[relativePath] || 'home.png'
  return `${siteUrl}/covers/${cover}`
}

function toCoverAlt(pageTitle: string) {
  return `${pageTitle} cover image`
}

export default defineConfig({
  title: 'Ogma',
  description: siteDescription,
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  // README.md and LICENSE are repo files, not docs pages -- skip their links
  ignoreDeadLinks: [/^\.\/LICENSE$/, /^\.\/README/],
  srcExclude: ['README.md'],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/ogma-mark.svg' }],
    ['meta', { name: 'theme-color', content: '#C17D2A' }],
    ['meta', { name: 'application-name', content: siteTitle }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:title', content: 'Ogma Documentation' }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:image', content: `${siteUrl}/covers/home.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Ogma Documentation' }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['meta', { name: 'twitter:image', content: `${siteUrl}/covers/home.png` }]
  ],
  themeConfig: {
    logo: {
      light: '/logo-ogma-light.svg',
      dark: '/logo-ogma-dark.svg',
      alt: 'Ogma',
    },
    siteTitle,
    nav: [],
    sidebar: [
      {
        text: 'Start here',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting started', link: '/getting-started' },
          { text: 'First capture', link: '/guide/first-capture' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      },
      {
        text: 'App',
        items: [
          { text: 'Ogma Browser', link: '/app/browser' },
          { text: 'HTTP History', link: '/app/http-history' },
          { text: 'Intercept', link: '/app/intercept' },
          { text: 'Replay', link: '/app/replay' },
          { text: 'Automate', link: '/app/automate' },
          { text: 'Workflows', link: '/app/workflows' },
          { text: 'Findings', link: '/app/findings' },
          { text: 'Search', link: '/app/search' },
          { text: 'Sitemap', link: '/app/sitemap' },
          { text: 'Endpoints', link: '/app/endpoints' },
          { text: 'Scope', link: '/app/scope' },
          { text: 'Filters', link: '/app/filters' },
          { text: 'Match & Replace', link: '/app/match-replace' },
          { text: 'WebSocket / SSE History', link: '/app/ws-sse-history' },
          { text: 'Environment', link: '/app/environment' },
          { text: 'Exports', link: '/app/exports' },
          { text: 'Files', link: '/app/files' },
          { text: 'Plugins', link: '/app/plugins' },
          { text: 'Settings', link: '/app/settings' }
        ]
      },
      {
        text: 'Utilities',
        items: [
          { text: 'Scanner', link: '/app/utilities/scanner' },
          { text: 'OAST', link: '/app/utilities/oast' },
          { text: 'Decoder', link: '/app/utilities/decoder' },
          { text: 'JWT', link: '/app/utilities/jwt' },
          { text: 'Compare', link: '/app/utilities/compare' },
          { text: 'Request Sequencer', link: '/app/utilities/request-sequencer' },
          { text: 'Token Analysis', link: '/app/utilities/token-analysis' },
          { text: 'Payloads', link: '/app/utilities/payloads' },
          { text: 'Race / Smuggling', link: '/app/utilities/race-smuggling' },
          { text: 'Reverse Shell', link: '/app/utilities/reverse-shell' },
          { text: 'Discovery', link: '/app/utilities/discovery' },
          { text: 'Notes', link: '/app/utilities/notes' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Proxy workflow', link: '/guide/proxy-workflow' },
          { text: 'Scanning workflow', link: '/guide/scanning' },
          { text: 'Replay and automation', link: '/guide/replay-automation' },
          { text: 'Projects and data', link: '/guide/projects-data' },
          { text: 'Workspace AI', link: '/guide/workspace-ai' }
        ]
      },
      {
        text: 'Automation',
        items: [
          { text: 'Workspace AI', link: '/guide/workspace-ai' },
          { text: 'MCP setup', link: '/mcp-setup' },
          { text: 'MCP resources and tools', link: '/reference/mcp-tools' }
        ]
      },
      {
        text: 'Plugins',
        items: [
          { text: 'Plugin system', link: '/plugins/README' },
          { text: 'Backend SDK', link: '/plugins/backend-sdk' },
          { text: 'Frontend SDK', link: '/plugins/frontend-sdk' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'HTTPQL and StreamQL', link: '/reference/httpql' },
          { text: 'MCP resources and tools', link: '/reference/mcp-tools' },
          { text: 'CLI reference', link: '/reference/cli' },
          { text: 'Ogma vs Caido', link: '/reference/vs-caido' },
          { text: 'Ogma vs Burp Suite', link: '/reference/vs-burpsuite' },
          { text: 'Security model', link: '/security' },
          { text: 'Architecture', link: '/development/architecture' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: githubUrl },
      { icon: 'discord', link: 'https://discord.gg/QNSadmjh6y' },
      { icon: 'x', link: 'https://x.com/kaijinlab' }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/KaijinLab/ogma-docs/edit/master/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Proprietary software. All rights reserved.',
      copyright: 'Copyright © 2024-present Kaijin Lab'
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },
  transformHtml(code) {
    let html = code
      .replace(/<div class="item" role="button" tabindex="0"(\sdata-v-[a-f0-9]+)>/g, '<div class="item"$1>')

    let previous: string
    do {
      previous = html
      html = html.replace(/(\sdata-v-([a-f0-9]+))(?:\s+data-v-\2)+/g, '$1')
    } while (html !== previous)

    return html
  },
  transformPageData(pageData) {
    const pageTitle = pageData.title ? `${pageData.title} - ${siteTitle}` : siteTitle
    const pageDescription = pageData.description || siteDescription
    const pageUrl = toCleanUrl(pageData.relativePath)
    const pageImage = toCoverUrl(pageData.relativePath)
    const pageImageAlt = toCoverAlt(pageTitle)
    const keywords = pageData.frontmatter?.keywords as string | undefined

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': pageData.relativePath === 'index.md' ? 'WebPage' : 'TechArticle',
      name: pageTitle,
      headline: pageTitle.replace(` - ${siteTitle}`, ''),
      description: pageDescription,
      url: pageUrl,
      image: pageImage,
      publisher: {
        '@type': 'Organization',
        name: 'Kaijin Lab',
        url: 'https://github.com/KaijinLab',
      },
    }

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head = (pageData.frontmatter.head as any[]).filter(
      ([tag, attrs]: any) => {
        const key = attrs?.property || attrs?.name || attrs?.rel
        const generatedMeta = [
          'canonical',
          'description',
          'keywords',
          'og:type',
          'og:site_name',
          'og:title',
          'og:description',
          'og:url',
          'og:image',
          'og:image:alt',
          'og:image:width',
          'og:image:height',
          'twitter:card',
          'twitter:title',
          'twitter:description',
          'twitter:image',
          'twitter:image:alt',
        ].includes(key)

        return !generatedMeta && !(tag === 'script' && attrs?.id === 'ogma-jsonld')
      }
    )

    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { name: 'description', content: pageDescription }],
      ...(keywords ? [['meta', { name: 'keywords', content: keywords }]] : []),
      ['meta', { property: 'og:type', content: pageData.relativePath === 'index.md' ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: siteTitle }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:image', content: pageImage }],
      ['meta', { property: 'og:image:alt', content: pageImageAlt }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: pageImage }],
      ['meta', { name: 'twitter:image:alt', content: pageImageAlt }],
      ['script', { id: 'ogma-jsonld', type: 'application/ld+json' }, safeJsonLd(jsonLd)],
    )
  },
})
