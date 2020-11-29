<!-- home -->
<template>
  <div class="con">
    <van-nav-bar
      title="首页"
      :fixed="true"
    />

    <div class="index-bg">

    </div>

    <div class="d1">
      <div style="width: 50%;" class=" flex-column mt30">
        <h1 class="mb0 cfff ct">{{nickname}}</h1>
        <h3 class="mt0 cfff">{{phone}}</h3>
      </div>
      <div style="width: 50%;" class=" mt30 flex justify-content-end">
        <img src="../../../static/img/login-out.png" alt="" class="imgs mt25">
        <h2 class="cfff mt25" @click="goOut()">退出登录</h2>
      </div>
    </div>

    <div class="d2">

      <van-swipe-cell v-for="item of devicesInfoList" :key="item" class="mb10 cell-list">

        <div style="" class="cell-content">

          <div class="flex align-items-center cell1">
            <img src="../../../static/img/yangan.png" alt="" class="imgs">
            <div class="name">{{item.name}}</div>
          </div>

          <div class="cell12 fs14 ct">
            设备编号:{{item.no}}
          </div>
          <div class="cell13 fs14">
            详细地址:{{item.cityName}} {{item.installLocation}}
          </div>
        </div>

        <template #right>
          <van-button square text="编辑" type="warning" class="delete-button" @click="edit(item)"/>
          <van-button square text="删除" type="danger" class="delete-button" @click="remove(item)"/>
        </template>
      </van-swipe-cell>

    </div>

  </div>

</template>

<script>
import { Toast } from 'vant'
import { getDevices, getUnHandleAlarmList, removeDevice } from '../../api/user'
export default {
  data() {
    return {
      devicesInfoList: [],
      nickName: '',
      phone: '',
      timer: ''
    }
  },

  computed: {},

  mounted() {
    this.getDevicesInfo()
    this.nickname = window.localStorage.getItem('nick_name')
    this.phone = window.localStorage.getItem('phone')

    this.getUnHandleAlarmListInfo()
    this.timer = setInterval(() => {
      this.getUnHandleAlarmListInfo()
    }, 30000)
  },

  methods: {
    getDevicesInfo() {
      getDevices().then(res => {
        this.devicesInfoList = res.data
      }).catch(res => {
      })
    },
    goOut() {
      clearInterval(this.timer)
      window.localStorage.clear()
      this.$router.replace('/login')
    },
    edit(item) {
      clearInterval(this.timer)
      const objAdd = JSON.stringify(item)
      this.$router.replace({ path: '/device-register-info?objAdd=' + encodeURIComponent(objAdd), query: { router: '/home' }})
    },
    remove(item) {
      removeDevice({ deviceId: item.id }).then(res => {
        Toast('删除设备成功')
        this.getDevicesInfo()
      })
    },
    getUnHandleAlarmListInfo() {
      getUnHandleAlarmList().then(res => {
        if (res.data.length > 0) {
          clearInterval(this.timer)
          this.$router.replace('/device-alert')
        }
      }).catch(res => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .index-bg {
    width: 100vw;
    height: 255px;
    background-image: url('../../../static/img/register-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .index-content {
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 150px;
  }

  .index-content-w {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .d1 {
    height: 200px;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
  }

  .d2 {
    margin-top: 100px;
    width: 100%;
    height: calc(100vh - 150px);
    box-sizing: border-box;
    overflow: auto;
  }

  .d1, .d2 {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .con {
    width: 100vw;
    height: calc(100vh - 50px);
    box-sizing: border-box;
  }

  .content-item {
    height: 100px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: #999 1px 0px 3px;
    margin-top: 20px;
  }
.cell-list{
  box-shadow: #e3e3e3 1px 0px 3px;

}
.cell-content{
  height: auto;width: 100%;background: #fff;
  padding: 13px;box-sizing: border-box;
}
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
  .imgs{
    width: 18px;
    height: 18px;
  }
  .name{
    font-size: 18px;
  }
  .cell1{
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 6px;
    margin-bottom: 5px;
  }
  .cell12{
    margin-bottom: 5px;
  }
</style>
