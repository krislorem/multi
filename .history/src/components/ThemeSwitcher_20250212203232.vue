<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { Icon } from '@iconify/vue'

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
  if (targetTheme === 'dark') {
    const mask = document.createElement('div')
    mask.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    clip-path: circle(0% at ${x}px ${y}px);
    z-index: 9999;
    pointer-events: none;
    mix-blend-mode: difference;
  `
    document.body.appendChild(mask)

    await gsap.to(mask, {
      clipPath: `circle(120% at ${x}px ${y}px)`,
      duration: 1,
      ease: 'power4.inOut'
    })

    themeStore.setTheme(targetTheme)
    currentTheme.value = targetTheme
    document.documentElement.setAttribute('data-theme', targetTheme)
    document.body.removeChild(mask)
  } else {
    const mask = document.createElement('div')
    mask.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  clip-path: circle(150% at ${x}px ${y}px);
  z-index: 9999;
  pointer-events: none;
    mix-blend-mode: difference;
    `
    document.documentElement.setAttribute('data-theme', targetTheme)
    document.body.appendChild(mask)

    await gsap.to(mask, {
      clipPath: `circle(0% at ${x}px ${y}px)`,
      duration: 1,
      ease: 'power4.inOut'
    })

    themeStore.setTheme(targetTheme)
    currentTheme.value = targetTheme
    document.body.removeChild(mask)
  }
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', themeStore.currentTheme)
})
</script>

<template>
  <button @click="switchTheme" class="theme-switcher"
    :title="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`">
    <transition name="fade" mode="out-in">
      <Icon v-if="currentTheme === 'light'" icon="line-md:sun-rising-loop" />
      <Icon v-else icon="line-md:moon-alt-loop" />
    </transition>
  </button>
</template>

<style lang="scss">
.theme-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  /* 设置按钮的宽度 */
  height: 30px;
  /* 设置按钮的高度 */
  border-radius: 50%;
  /* 设置为圆形 */
  border: none;
  /* 移除边框 */
  cursor: pointer;
  /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s;
  /* 背景颜色过渡效果 */
  outline: none;
  /* 移除默认的焦点边框 */

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.98);
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
