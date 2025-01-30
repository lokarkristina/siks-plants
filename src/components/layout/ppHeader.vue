<script setup lang="ts">
const routerLinkClasses = [
  'inline-block',
  'px-4',
  'py-2',
  'font-logo',
  'font-bold',
  'text-primary',
  'border-b-2',
  'border-b-dark/0',
  'hover:text-dark',
  'hover:border-b-dark/90',
  'focus:border-b-primary/90',
  'focus:outline-none',
  'transition-colors',
  'duration-200',
]
</script>

<template>
  <header class="px-5 py-3 border-b border-b-accent/10 bg-accent/20 shadow-sm">
    <div class="container mx-auto flex justify-between items-center">
      <div class="header-logo max-w-40">
        <RouterLink to="/">
          <img alt="plant.pal logo" class="logo" src="@/assets/logo.svg" />
        </RouterLink>
      </div>

      <div class="hidden w-full md:block md:w-auto">
        <nav class="main-menu grid grid-flow-col gap-2.5 translate-x-4">
          <RouterLink to="/" :class="routerLinkClasses">my plants</RouterLink>
          <RouterLink to="/plants/add" :class="routerLinkClasses">add plant</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style>
.router-link-active {
  border-color: var(--color-dark);
  color: var(--color-dark)
}
</style>
