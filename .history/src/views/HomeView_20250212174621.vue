<script setup lang="ts"></script>

<template>
  <div class="home-view">
    <h1>Welcome to Theme Demo</h1>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>Feature 1</h3>
        <p>Experience smooth theme transitions</p>
      </div>
      <div class="feature-card">
        <h3>Feature 2</h3>
        <p>Customizable color schemes</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-view {
  text-align: center;

  h1 {
    margin-bottom: 2rem;
    color: var(--primary-color);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature-card {
    padding: 2rem;
    background: rgba(var(--primary-color), 0.1);
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
  }
}
</style>
