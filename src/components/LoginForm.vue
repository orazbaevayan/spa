<template>
  <form @submit.prevent="login(credentials)">
    <label for="username">{{ $t('ui.ИИН') }} / {{ $t('ui.Номер телефона') }}</label>
    <input id="username" type="text" v-model="credentials.username" maxlength="12" autocomplete="off">
    <label for="password">{{ $t('ui.Пароль') }}</label>
    <input id="password" type="password" v-model="credentials.password">
    <button type="submit">{{ $t('ui.Вход') }}</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        credentials: {
          username: '',
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