<template>
  <form @submit.prevent="login(credentials)">
    <label for="iin">ИИН</label>
    <input id="iin" type="text" v-model="credentials.email" autocomplete="off">
    <label for="password">Пароль</label>
    <input id="password" type="password" v-model="credentials.password">
    <input type="submit" value="Вход">
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
    }
  }
</script>

<style lang="scss">
  form {
    max-width: 100%;
    width: 300px;
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 4px;
    }
    input {
      margin-bottom: 16px;
    }
  }
</style>