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
        <div class="fs16 p5 mb25">
          选择一：扫描二维码获取
        </div>

        <van-button icon="scan" type="primary" block class="chuli mb25" @click="addScan()">添加设备</van-button>

        <div class="fs16 p5 mb25">
          选择二：手动添加设备
        </div>

        <van-button icon="plus" type="primary" block class="chuli" @click="addSelf()">添加设备</van-button>

      </div>

    </div>

  </div>

</template>

<script>
import { Toast } from 'vant'
import { getDeviceByImei } from '../../api/user'
export default {
  name: 'add-select',
  data() {
    return {

    }
  },
  mounted() {
    this.startJssdk()
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
      this.openQRCode()
    },
    addSelf() {
      this.$router.replace({ path: '/add-code', query: { router: '/add-select' }})
    },
    startJssdk() {
      const url = location.href.split('#')[0]
      this.$axios({
        method: 'GET',
        url: `wxapi/wx/jsapi/wx7fbadec3812a8afe/getJsapiSignature?url=${url}`
      }
      ).then(res => {
        this.$wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['scanQRCode', 'checkJsApi']
        })

        this.$wx.ready(function(res) {})
        this.$wx.error(function(res) {})
      }).catch(res => {
      })
    },
    openQRCode() {
      this.$wx.scanQRCode({
        needResult: 1,
        success: res => {
          const result = res.resultStr
          if (result != null && result !== '' && result !== undefined) {
            const postData = {
              imei: result
            }
            getDeviceByImei(postData).then(res => {
              res.data['no'] = res.data['imei']
              res.data['id'] = res.data['deviceId']
              const objAdd = JSON.stringify(res.data)
              this.$router.replace({ path: '/device-register-info?objAdd=' + encodeURIComponent(objAdd), query: { router: '/home' }})
            }).catch(res => {
              Toast('设备不存在')
            })
          } else {
          }
        }
      })
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
  .line{
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 10px;
  }
  .chuli{
    background-color: #3BB19C !important;
    border: 0.02667rem solid #3BB19C !important;
  }
  .van-cell{
    padding: 0;
  }
</style>

