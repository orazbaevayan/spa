<template>
  <form @submit.prevent="login(credentials)">
    <div class="px-2 pb-2">
      <label class="form-label" for="username">{{ $t('ui.ИИН') }} / {{ $t('ui.Номер телефона') }}</label>
      <input id="username" class="form-control form-control-sm" type="text" v-model="credentials.username" maxlength="12" autocomplete="off">
    </div>
    <div class="px-2 pb-2">
      <label class="form-label" for="password">{{ $t('ui.Пароль') }}</label>
      <input class="form-control form-control-sm" id="password" type="password" v-model="credentials.password">
    </div>
    <div class="p-2">
      <button class="btn btn-sm btn-primary w-100 text-white" type="submit">{{ $t('ui.Вход') }}</button>
    </div>
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
      line-height: 1;
      margin-bottom: 4px;
    }
  }
</style>