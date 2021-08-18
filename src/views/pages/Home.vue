<template>
  <h1>Home</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      user: 'auth/user',
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
