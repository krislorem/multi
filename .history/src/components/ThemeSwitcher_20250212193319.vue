<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const themeStore = useThemeStore()
const currentTheme = ref(themeStore.currentTheme)

const getCenterPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  }
}

const switchTheme = async (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const { x, y } = getCenterPosition(button)
  const targetTheme = currentTheme.value === 'light' ? 'dark' : 'light'

  const mask = document.createElement('div')
  mask.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #080;
    clip-path: ${targetTheme === 'dark' ? `circle(0% at ${x}px ${y}px)` : `circle(150% at ${x}px ${y}px)`};
    z-index: 9999;
    pointer-events: none;
    mix-blend-mode: difference;
  `
  document.body.appendChild(mask)

  await gsap.to(mask, {
    clipPath: targetTheme === 'dark' ? `circle(150% at ${x}px ${y}px)` : `circle(0% at ${x}px ${y}px)`,
    duration: 0.5,
    ease: 'power4.out'
  })

  themeStore.setTheme(targetTheme)
  currentTheme.value = targetTheme
  document.documentElement.setAttribute('data-theme', targetTheme)
  document.body.removeChild(mask)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', themeStore.currentTheme)
})
</script>

<template>
  <button @click="switchTheme" class="theme-switcher"
    :title="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`">
    <transition name="fade" mode="out-in">
      <span :key="currentTheme">
        {{ currentTheme === 'light' ? '🌙' : '☀️' }}
      </span>
    </transition>
  </button>
</template>

<style lang="scss">
.theme-switcher {
  background: var(--primary-color);
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  span {
    display: block;
    font-size: 1.2rem;
    line-height: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
