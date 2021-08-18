<template>
  <component :is="$route.meta.layout">
    <router-view/>
  </component>
  <LoadingOverlay />
</template>

<script>
  import LoadingOverlay from '@/components/LoadingOverlay'

  export default {
    components: {
      LoadingOverlay
    }
  }
</script>