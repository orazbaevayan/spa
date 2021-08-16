<template>
  <form @submit.prevent="login(credentials)">
    <label for="iin">{{ $t('ui.ИИН') }}</label>
    <input id="iin" type="text" v-model="credentials.iin" maxlength="12" autocomplete="off">
    <label for="password">{{ $t('ui.Пароль') }}</label>
    <input id="password" type="password" v-model="credentials.password">
    <input type="submit" :value="$t('ui.Вход')">
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        credentials: {
          iin: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        login: 'auth/login'
      }),
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