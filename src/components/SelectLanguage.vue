<template>
  <select v-model="language">
    <option value="ru">РУС</option>
    <option value="kz">ҚАЗ</option>
    <option value="en">ENG</option>
  </select>
</template>

<script>
  export default {
    computed: {
      language: {
        get() {
          return this.$store.getters['locales/language'];
        },
        set(value) {
          this.$store.commit('locales/SET_LANGUAGE', value);
        }
      }
    }
  }
</script>

<style lang="scss">

</style>