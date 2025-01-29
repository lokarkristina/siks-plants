<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="px-5 py-10 border-b-1 border-b-primary/25">
    <div class="container flex justify-between items-center">
      <div class="header-logo max-w-40">
        <img alt="plant.pal logo" class="logo" src="@/assets/logo.svg" />
      </div>

      <nav class="main-menu grid grid-flow-col gap-2.5">
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/my-plants">my plants</RouterLink>
        <RouterLink to="/about">about</RouterLink>
      </nav>
    </div>
  </header>
</template>

<!-- @todo checkout how nested CSS works/if it would be useful here -->
<style scoped>
.main-menu a {
  padding: calc(var(--spacing) * 2);
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  text-transform: uppercase;

  /* @todo add proper hover */
  &:hover {
    text-decoration: underline var(--spacing);
  }
}
</style>
