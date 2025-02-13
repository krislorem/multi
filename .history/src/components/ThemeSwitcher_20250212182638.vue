<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { ref, onMounted, watchEffect } from 'vue'
import gsap from 'gsap'

const themeStore = useThemeStore()
const targetTheme = ref(themeStore.currentTheme)

// 颜色映射表
const colorVars = [
  '--bg-color',
  '--text-color',
  '--primary-color',
  '--accent-color'
]

const getComputedColor = (theme: string, colorVar: string) => {
  const root = document.documentElement
  const currentTheme = root.getAttribute('data-theme')

  // 临时切换主题获取颜色值
  root.setAttribute('data-theme', theme)
  const color = getComputedStyle(root)
    .getPropertyValue(colorVar.replace('mask-', ''))

  // 恢复原主题
  currentTheme
    ? root.setAttribute('data-theme', currentTheme)
    : root.removeAttribute('data-theme')

  return color
}

const switchTheme = async (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const newTheme = targetTheme.value === 'light' ? 'dark' : 'light'

  // 创建双层遮罩
  const maskWrapper = document.createElement('div')
  const maskLayer = document.createElement('div')
  maskWrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
  `
  maskLayer.style.cssText = `
    width: 100%;
    height: 100%;
    mix-blend-mode: difference;
    clip-path: circle(0% at ${centerX}px ${centerY}px);
  `

  // 应用mask颜色变量
  colorVars.forEach(varName => {
    const maskVar = `mask-${varName}`
    const targetColor = getComputedColor(newTheme, varName)
    maskLayer.style.setProperty(varName, targetColor)
  })

  maskWrapper.appendChild(maskLayer)
  document.body.appendChild(maskWrapper)

  // 动画执行
  await gsap.to(maskLayer, {
    clipPath: `circle(150% at ${centerX}px ${centerY}px)`,
    duration: 0.5,
    ease: 'power4.out',
    onComplete: () => {
      themeStore.setTheme(newTheme)
      targetTheme.value = newTheme
      document.body.removeChild(maskWrapper)
    }
  })
}

// 动态更新CSS变量
watchEffect(() => {
  const root = document.documentElement
  root.setAttribute('data-theme', themeStore.currentTheme)
})
</script>

<template>
  <button @click="switchTheme" class="theme-switcher" :style="{
    '--button-bg': `var(--primary-color)`,
    '--button-text': `var(--text-color)`
  }">
    <span class="icon">
      {{ targetTheme === 'light' ? '🌙' : '☀️' }}
    </span>
  </button>
</template>

<style lang="scss">
.theme-switcher {
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.3s var(--theme-transition);

  &:hover {
    transform: scale(1.1);
  }

  .icon {
    display: block;
    font-size: 1.2rem;
    transition: opacity 0.3s var(--theme-transition);
  }
}
</style>
