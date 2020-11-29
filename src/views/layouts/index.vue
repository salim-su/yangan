<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home',
            replace: true
          },
          icon: 'home-o'
        },
        {
          icon: require('../../../static/img/index-sel.png')
        },
        {
          title: '报警',
          to: {
            name: 'About',
            replace: true
          },
          icon: 'volume-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  mounted() {

  },
  methods: {
    handleChange(v) {
      if (v === 1) {
        this.$router.replace({ path: '/add-select', query: { router: '/home' }})
      }
    }
  }
}
</script>

