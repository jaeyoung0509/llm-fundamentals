<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from 'vue'

type MermaidApi = (typeof import('mermaid'))['default']

const props = defineProps<{
  code?: string
}>()

const slots = useSlots()
const container = ref<HTMLElement | null>(null)
const errorMessage = ref('')

let isInitialized = false
let mermaidApi: MermaidApi | null = null

const source = computed(() => {
  if (props.code) {
    return props.code.trim()
  }

  const nodes = slots.default?.() ?? []
  return nodes
    .map((node) => (typeof node.children === 'string' ? node.children : ''))
    .join('')
    .trim()
})

async function ensureMermaid() {
  if (!mermaidApi) {
    mermaidApi = (await import('mermaid')).default
  }

  if (isInitialized) {
    return mermaidApi
  }

  mermaidApi.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    themeVariables: {
      primaryColor: '#d7f4ea',
      primaryTextColor: '#0b1718',
      primaryBorderColor: '#0f3d3e',
      lineColor: '#0f3d3e',
      secondaryColor: '#fff0c7',
      tertiaryColor: '#eef7ff'
    }
  })

  isInitialized = true
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

onMounted(renderDiagram)
watch(source, renderDiagram)
</script>

<template>
  <div class="mermaid-block">
    <div ref="container" class="mermaid-diagram" />
    <p v-if="errorMessage" class="mermaid-error">{{ errorMessage }}</p>
  </div>
</template>
