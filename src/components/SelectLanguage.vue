<template>
  <select class="form-select form-select-sm py-0 ps-1 pe-3" v-model="language">
    <option value="ru">РУС</option>
    <option value="kk">ҚАЗ</option>
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

<style lang="scss" scoped>
  select {
    background-position: right 0.1rem center;
  }
</style>