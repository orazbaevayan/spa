<template>
  <div id="header">
    <h1>Home</h1>
    <LogoutButton />
  </div>
  <div id="content">
    
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton'
export default {
  name: 'Home',
  components: {
    LogoutButton
  },
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
