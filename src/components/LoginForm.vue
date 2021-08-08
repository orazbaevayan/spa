<template>
  <form @submit.prevent="login">
    <label for="iin">ИИН</label>
    <input id="iin" type="text" v-model="credentials.email" autocomplete="off">
    <label for="password">Пароль</label>
    <input id="password" type="password" v-model="credentials.password">
    <input type="button" value="Вход" @click.prevent="login">
  </form>
</template>

<script>
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
      login() {
        this.axios.get('http://localhost:8040/sanctum/csrf-cookie').then(() => {
          this.axios.post('http://localhost:8040/login', this.credentials).then(response => {
            if (response.status === 200) this.$router.push({ name: 'Home' });
          });
        });
      },
    }
  }
</script>

<style lang="scss">
  form {
    max-width: 100%;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: 0 auto;
    label {
      margin-bottom: 4px;
    }
    input {
      margin-bottom: 16px;
    }
  }
</style>