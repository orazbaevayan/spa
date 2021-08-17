<template>
  <div id="header">
    <h1>{{ $t('pages.Главная') }}</h1>
    <SelectLanguage />
    <span>{{ user?.first_name }}</span>
    <LogoutButton />
  </div>
  <div id="content">

  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton'
import SelectLanguage from '@/components/SelectLanguage'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    LogoutButton,
    SelectLanguage
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
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
  text-align: center;
  padding: 20px;
}
</style>
