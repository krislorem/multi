<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <div class="app-container">
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <ThemeSwitcher />
    </nav>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss">
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .main-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 1rem;
    background: rgba(var(--primary-color), 0.1);
    border-radius: 8px;

    a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: var(--text-color);
      border-radius: 4px;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(var(--primary-color), 0.2);
      }

      &.router-link-active {
        background: var(--primary-color);
        color: white;
      }
    }
  }

  .main-content {
    min-height: 60vh;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
