<script setup lang="ts">
// components
import ppHeader from '@/components/layout/ppHeader.vue'
import ppFooter from '@/components/layout/ppFooter.vue'
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
