<template>
  <component :is="$route.meta.layout">
    <router-view/>
  </component>
  <Overlay />
</template>

<script>
  import Overlay from '@/components/Overlay'

  export default {
    components: {
      Overlay
    }
  }
</script>