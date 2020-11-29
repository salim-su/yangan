<template>
  <div class="alert">
    <div class="alert-bg">

    </div>

    <van-nav-bar
      title="添加设备选项"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />

    <div class="alert-con">
      <div class="bianhao flex flex-column p15">
        <div class="fs16 p5">
          设备编号
        </div>

        <div class="fs16 p5 line mb30">
          <van-field v-model="no" type="text" placeholder="请输入设备编号"/>
        </div>

        <van-button type="primary" block class="chuli" @click="done()">确 认</van-button>

      </div>

    </div>

  </div>

</template>

<script>
import { Toast } from 'vant'
import { getDeviceByImei } from '../../api/user'

export default {
  name: 'add-code',
  data() {
    return {
      no: ''
    }
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      if (this.$route.query.router) {
        this.$router.replace(this.$route.query.router)
      } else {
        this.$router.replace('/')
      }
    },
    addScan() {
    },
    addSelf() {
    },
    done() {
      if (!this.no) {
        Toast('请输入设备编号')
        return
      }

      const postData = {
        imei: this.no
      }
      getDeviceByImei(postData).then(res => {
        res.data['no'] = res.data['imei']
        res.data['id'] = res.data['deviceId']
        const objAdd = JSON.stringify(res.data)
        this.$router.replace({ path: '/device-register-info?objAdd=' + encodeURIComponent(objAdd), query: { router: '/home' }})
      }).catch(res => {
        Toast('设备不存在')
      })
    }
  },
  watch: {
    $route(to, from) {
    }
  }
}
</script>

<style scoped>
  .alert-bg {
    width: 100vw;
    height: 255px;
    background-image: url('../../../static/img/register-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .alert {
    width: 100vw;
    height: 100vh;
    background: #F1F0F6;
    padding-top: 60px;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
  }

  .alert-con {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    z-index: 9;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 20px;
    box-sizing: border-box;
  }

  .line {
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 10px;
  }

  .chuli {
    background-color: #3BB19C !important;
    border: 0.02667rem solid #3BB19C !important;
  }

  .van-cell {
    padding: 0;
  }
</style>
