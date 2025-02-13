<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <RouterLink to="/" class="home-link">
      ← Back to Home
    </RouterLink>
  </div>
</template>

<style lang="scss">
.not-found {
  text-align: center;
  padding: 4rem;
  min-height: 100vh;
  display: grid;
  place-content: center;

  h1 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .home-link {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: var(--primary-color);
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
}
</style>
