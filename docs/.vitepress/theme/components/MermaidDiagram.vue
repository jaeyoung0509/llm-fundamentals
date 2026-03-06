<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import type { VNode, VNodeArrayChildren } from 'vue'

type MermaidApi = (typeof import('mermaid'))['default']

const props = defineProps<{
  code?: string
}>()

const slots = useSlots()
const container = ref<HTMLElement | null>(null)
const errorMessage = ref('')
let mermaidApi: MermaidApi | null = null
let themeObserver: MutationObserver | null = null

function extractText(children: VNode['children'] | VNodeArrayChildren): string[] {
  if (typeof children === 'string') {
    return [children]
  }

  if (!Array.isArray(children)) {
    return []
  }

  return children.flatMap((child) => {
    if (typeof child === 'string') {
      return [child]
    }

    if (typeof child === 'object' && child !== null && 'children' in child) {
      return extractText(child.children as VNode['children'] | VNodeArrayChildren)
    }

    return []
  })
}

const source = computed(() => {
  if (props.code) {
    return props.code.trim()
  }

  const nodes = slots.default?.() ?? []
  return extractText(nodes as VNodeArrayChildren)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
})

function getThemeVariables() {
  const isDark = document.documentElement.classList.contains('dark')

  if (isDark) {
    return {
      primaryColor: '#173f40',
      primaryTextColor: '#f3efe4',
      primaryBorderColor: '#8fb8b0',
      lineColor: '#9ec7bf',
      secondaryColor: '#5a3c16',
      tertiaryColor: '#213033'
    }
  }

  return {
    primaryColor: '#d7f4ea',
    primaryTextColor: '#0b1718',
    primaryBorderColor: '#0f3d3e',
    lineColor: '#0f3d3e',
    secondaryColor: '#fff0c7',
    tertiaryColor: '#eef7ff'
  }
}

async function ensureMermaid() {
  if (!mermaidApi) {
    mermaidApi = (await import('mermaid')).default
  }

  mermaidApi.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    themeVariables: getThemeVariables()
  })

  return mermaidApi
}

async function renderDiagram() {
  if (!container.value || !source.value) {
    return
  }

  const mermaid = await ensureMermaid()

  try {
    const { svg } = await mermaid.render(
      `diagram-${Math.random().toString(36).slice(2, 10)}`,
      source.value
    )
    container.value.innerHTML = svg
    errorMessage.value = ''
  } catch (error) {
    container.value.innerHTML = ''
    errorMessage.value = error instanceof Error ? error.message : 'Failed to render Mermaid diagram.'
  }
}

onMounted(() => {
  renderDiagram()

  themeObserver = new MutationObserver(() => {
    renderDiagram()
  })

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
})

watch(source, renderDiagram)
</script>

<template>
  <div class="mermaid-block">
    <div ref="container" class="mermaid-diagram" />
    <p v-if="errorMessage" class="mermaid-error">{{ errorMessage }}</p>
  </div>
</template>
