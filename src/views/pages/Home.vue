<template>
  <div id="header">
    <h1>Home</h1>
    <LogoutButton />
  </div>
  <div id="content">
    <button @click.prevent="login({ email: 'a@a.a', password: 'a' })">LOGIN</button>
    {{ user }}
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    LogoutButton
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    })
  }
}
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#content {
  flex-grow: 1;
}
</style>
