<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Sora:wght@400;500;600&display=swap'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'From REST to MCP: Making Your Backend AI-Ready with FastMCP'

useSeoMeta({
  title,
  description: 'A talk on making your backend AI-ready with FastMCP — from REST APIs to the Model Context Protocol.',
  ogTitle: title,
  ogDescription: 'A talk on making your backend AI-ready with FastMCP — from REST APIs to the Model Context Protocol.'
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
