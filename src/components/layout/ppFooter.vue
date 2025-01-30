<template>
  <footer class="footer p-8 text-right bg-primary/50">
    <div class="container">
      <p class="font-logo text-sm color-dark">&copy; {{ new Date().getFullYear() }} Plant.Pal</p>
    </div>
  </footer>
</template>

<style>
.footer {
  background-image: url('@/assets/logo-icon.png');
  background-size: calc(var(--spacing) * 5);
}
</style>
