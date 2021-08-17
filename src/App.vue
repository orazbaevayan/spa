<template>
  <LoadingOverlay />
  <router-view/>
</template>

<script>
  import LoadingOverlay from '@/components/LoadingOverlay'

  export default {
    components: {
      LoadingOverlay
    }
  }
</script>