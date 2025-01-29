<script setup lang="ts">
import { RouterView } from 'vue-router'
// components
import ppHeader from '@/components/elements/ppHeader.vue'
import ppFooter from '@/components/elements/ppFooter.vue'
</script>

<template>
  <!-- page header -->
  <ppHeader />

  <!-- content -->
  <main class="container py-20">
    <RouterView />
  </main>

  <!-- page footer -->
  <ppFooter />
</template>

<style>
.container {
  width: max(95vw, var(--container-xl));
  margin-inline: auto;
}
</style>
