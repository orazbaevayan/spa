<template>
  <component :is="$route.meta.layout">
    <router-view />
  </component>
  <Overlay />
</template>

<script>
  import Overlay from '@/components/Overlay'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Overlay
    },
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