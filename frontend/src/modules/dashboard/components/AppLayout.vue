<template>
  <div>
    <AppToolbar v-model="drawer" />
    <AppMenu v-model="drawer" />
  </div>
</template>

<script>
import AppToolbar from './AppToolbar'
import AppMenu from './AppMenu'
export default {
  name: 'AppLayout',
  components: {
    AppToolbar,
    AppMenu
  },
  data: function () {
    return {
      drawer: false
    }
  }
}
</script>

<style>
</style>
