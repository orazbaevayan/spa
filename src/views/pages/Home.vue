<template>
  <div id="header">
    <h1>Home</h1>
    <SelectLanguage />
    <span>{{ user?.name }}</span>
    <LogoutButton />
  </div>
  <div id="content">
    <button @click.prevent="test">REQUEST</button>
    <br>
    <br>
    <button @click.prevent="test2">LOCALES</button>
    <br>
    <br>
    <button @click.prevent="test3">RELOAD</button>
    <br>
    <br>

  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton'
import SelectLanguage from '@/components/SelectLanguage'
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    LogoutButton,
    SelectLanguage
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    test() {
      window.axios.get('http://localhost:8040/api/test').then(response => {
        console.log(response);
      });
    },
    test2() {
      window.axios.get('http://localhost:8040/api/locales').then(response => {
        console.log(response);
      });
    },
    test3() {
      location.reload();
    },
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
  text-align: center;
  padding: 20px;
}
</style>
