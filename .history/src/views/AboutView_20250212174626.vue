<script setup lang="ts"></script>

<template>
  <div class="about-view">
    <h1>About This Project</h1>
    <div class="content">
      <p>This demo showcases:</p>
      <ul>
        <li>Vue 3 Composition API</li>
        <li>Dynamic theme switching</li>
        <li>GSAP animations</li>
        <li>State management with Pinia</li>
        <li>Persistent state storage</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.about-view {
  max-width: 800px;
  margin: 0 auto;

  h1 {
    color: var(--primary-color);
    margin-bottom: 2rem;
  }

  .content {
    background: rgba(var(--primary-color), 0.1);
    padding: 2rem;
    border-radius: 8px;

    p {
      margin-bottom: 1rem;
      font-weight: 500;
    }

    ul {
      list-style: none;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        position: relative;

        &::before {
          content: "•";
          color: var(--primary-color);
          position: absolute;
          left: -1.5rem;
        }
      }
    }
  }
}
</style>
