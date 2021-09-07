<template>
  <component :is="$route.meta.layout">
    <router-view />
  </component>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        'focus': 'ui/focus'
      })
    },
    watch: {
      focus(newFocus) {
        let noScrollFocusElements = [
          'left-sidebar',
          'right-sidebar'
        ];
        document.body.style['touch-action'] = noScrollFocusElements.includes(newFocus) ? 'none' : '';
      }
    },
  }
</script>