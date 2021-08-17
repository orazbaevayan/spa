<template>
  <router-view/>
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