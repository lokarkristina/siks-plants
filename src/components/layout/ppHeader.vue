<script setup lang="ts">
const routerLinkClasses = [
  'inline-block',
  'px-4',
  'py-2',
  'font-logo',
  'font-bold',
  'text-primary',
  'md:border-b-2',
  'md:border-b-dark/0',
  'hover:text-dark',
  'hover:border-b-dark/90',
  'focus:border-b-primary/90',
  'focus:outline-none',
  'transition-colors',
  'duration-200',
]
</script>

<template>
  <header class="header px-5 py-3 border-b border-b-accent/10 shadow-sm" role="banner">
    <div class="relative container mx-auto flex justify-between items-center">
      <div class="header-logo max-w-40">
        <RouterLink to="/" aria-label="Home">
          <img alt="plant.pal logo" class="logo" src="@/assets/logo.svg" />
        </RouterLink>
      </div>

      <!-- main navigation -->
      <input type="checkbox" id="menu-toggle" class="navigation-toggle md:hidden sr-only" />
      <label
        data-collapse-toggle="navbar-default"
        type="button"
        for="menu-toggle"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-dark md:hidden focus:outline-none focus:ring-1"
        aria-controls="navbar-default"
      >
        <span class="sr-only">Open main menu</span>
        <!-- the mobile menu icon -->
        <svg
          class="menu-icon w-6 h-6 text-dark/80"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 17 14"
        >
          <path
            d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z"
          />
        </svg>
      </label>
      <div
        class="navigation-menu absolute inset-[100%_0_auto_auto] border md:border-none md:static md:visible md:max-h-none bg-white md:bg-white/0"
        id="navbar-default"
      >
        <nav
          class="main-menu grid md:grid-flow-col gap-1 md:gap-2.5 md:translate-x-4"
          aria-label="Main Navigation"
        >
          <RouterLink to="/" :class="routerLinkClasses" aria-label="My Plants">
            my plants
          </RouterLink>
          <RouterLink to="/plants/add" :class="routerLinkClasses" aria-label="Add Plant">
            add plant
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.router-link-active {
  border-color: var(--color-dark);
  color: var(--color-dark);
}

/* just a quick functionality, should/could be cleaner */
.header:has(.navigation-toggle:checked) {
  .navigation-menu {
    max-height: calc(var(--spacing) * 30);
    visibility: visible;
  }

  .menu-icon {
    transform: scaleY(-1);
  }
}

.navigation-menu {
  max-height: 0;
  visibility: hidden;
}

/* @todo, maybe this can be done with classes, also? */
@media (min-width: 768px) {
  .navigation-menu {
    max-height: none;
    visibility: visible;
  }
}
</style>
