<script setup lang="ts">
// components
import ppHeader from '@/components/layout/ppHeader.vue'
import ppFooter from '@/components/layout/ppFooter.vue'
</script>

<template>
  <!-- page header -->
  <ppHeader />

  <!-- content -->
  <main class="container px-10 md:px-15 py-10 mx-auto mb-20">
    <RouterView />
  </main>

  <!-- page footer -->
  <ppFooter />
</template>
