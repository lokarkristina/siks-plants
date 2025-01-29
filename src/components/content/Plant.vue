<template>
  <div class="plant">
    <h1>{{ $route.params.name }}</h1>

    <RouterLink
      :to="{
        name: 'plant-edit',
        params: {
          name: $route.params.name,
        },
      }"
    >
      Edit
    </RouterLink>

    <RouterView />
  </div>
</template>
