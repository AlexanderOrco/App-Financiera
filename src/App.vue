<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const currentTheme = ref('light')
onBeforeMount(() => {
  const prefersDark: MediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)',
  )
  if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark')
    theme.global.name.value = 'dark'
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    theme.global.name.value = 'light'
  }
  prefersDark.addEventListener('change', () => {
    currentTheme.value = prefersDark.matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
    theme.global.name.value = currentTheme.value
  })
})
</script>

<template>
  <v-card>
    <v-layout>
      <v-main min-height="100vh">
        <v-container fluid class="d-flex h-100 justify-center">
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
