<template>

  <div class="alert">
    <div class="alert-bg">

    </div>

    <van-nav-bar
      title="设备注册明细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />

    <div class="alert-con">
      <div class="bianhao flex flex-column">
        <div class="fs16 p5">
          设备类型
        </div>

        <div class="fs16 p5 line">
          {{deviceCategoryText}}
        </div>

        <div class="fs16 p5 ct">
          设备编号
        </div>

        <div class="fs16 p5 line ct">
          {{no}}
        </div>

        <div class="fs16 p5">
          设备名称
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="deviceName" type="text" placeholder="请输入设备名称"/>
        </div>

        <div class="fs16 p5">
          联系电话
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="p1" type="number" placeholder="请输入联系电话1"/>
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="p2" type="number" placeholder="请输入联系电话2"/>
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="p3" type="number" placeholder="请输入联系电话3"/>
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="p4" type="number" placeholder="请输入联系电话4"/>
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="p5" type="number" placeholder="请输入联系电话5"/>
        </div>

        <div class="fs16 p5">
          城市
        </div>

        <div class="fs16 p5 line">
          <van-field
            readonly
            clickable
            name="cityName"
            :value="cityName"
            placeholder="点击选择省市区"
            @click="showArea = true"
          />
          <van-popup v-model="showArea" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onConfirm"
              @cancel="showArea = false"
            />
          </van-popup>
        </div>

        <div class="fs16 p5">
          安装地址
        </div>

        <div class="fs16 p5 line">
          <van-field v-model="installLocation" type="text" placeholder="请输入安装地址"/>
        </div>

        <div class="fs16 p5">
          通知方式
        </div>

        <div class="fs16 p5 line mb40">
          <van-checkbox-group v-model="result" direction="horizontal">
            <van-checkbox name="isCallPhone">电话</van-checkbox>
            <van-checkbox name="isSendSms">短信</van-checkbox>
            <van-checkbox name="isSendWechat">微信</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>

      <van-button type="primary" block class="chuli" @click="done()">完成注册</van-button>

    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
import { getAreaList } from '../../plugins/area'
import { updateDevice } from '../../api/user'

export default {
  name: 'device-register-info',
  data() {
    return {
      deviceName: '',
      cityName: '',
      cityCode: '',
      installLocation: '',
      showArea: false,
      result: [],
      areaList: getAreaList(), // 数据格式见 Area 组件文档
      info: '',
      deviceCategoryText: '',
      no: '',
      deviceId: '',
      gaodeLat: '',
      gaodeLng: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      p5: '',
      phoneNumbers: []
    }
  },

  mounted() {
    if (this.$route.query.objAdd) {
      this.patchValue()
    }
    this.startJssdk()
  },
  methods: {
    patchValue() {
      this.info = JSON.parse(this.$route.query.objAdd)
      const arr = []
      if (this.info.isCallPhone) {
        arr.push('isCallPhone')
      }
      if (this.info.isSendSms) {
        arr.push('isSendSms')
      }
      if (this.info.isSendWechat) {
        arr.push('isSendWechat')
      }

      if (this.info.phoneNumbers) {
        if (this.info.phoneNumbers[0]) {
          this.p1 = this.info.phoneNumbers[0]
        }
        if (this.info.phoneNumbers[1]) {
          this.p2 = this.info.phoneNumbers[1]
        }
        if (this.info.phoneNumbers[2]) {
          this.p3 = this.info.phoneNumbers[2]
        }
        if (this.info.phoneNumbers[3]) {
          this.p4 = this.info.phoneNumbers[3]
        }
        if (this.info.phoneNumbers[4]) {
          this.p5 = this.info.phoneNumbers[4]
        }
      }

      this.deviceName = this.info.name
      this.deviceCategoryText = this.info.deviceCategoryText
      this.no = this.info.no
      this.installLocation = this.info.installLocation
      this.cityName = this.info.cityName
      this.cityCode = this.info.cityCode
      this.deviceId = this.info.id
      this.result = arr
    },
    onClickLeft() {
      this.$router.replace(this.$route.query.router)
    },
    onConfirm(values) {
      this.cityName = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.cityCode = values
        .filter((item) => !!item)
        .map((item) => item.code)
        .join('/')
      this.showArea = false
    },
    done() {
      const postdata = {}
      if (this.result.filter(p => p === 'isCallPhone').length) {
        postdata['isCallPhone'] = 1
      } else {
        postdata['isCallPhone'] = 0
      }
      if (this.result.filter(p => p === 'isSendSms').length) {
        postdata['isSendSms'] = 1
      } else {
        postdata['isSendSms'] = 0
      }
      if (this.result.filter(p => p === 'isSendWechat').length) {
        postdata['isSendWechat'] = 1
      } else {
        postdata['isSendWechat'] = 0
      }
      postdata['cityCode'] = this.cityCode
      postdata['cityName'] = this.cityName
      postdata['deviceId'] = this.deviceId
      postdata['deviceName'] = this.deviceName
      postdata['installLocation'] = this.installLocation
      postdata['gaodeLat'] = this.gaodeLat
      postdata['gaodeLng'] = this.gaodeLng
      this.phoneNumbers = [this.p1, this.p2, this.p3, this.p4, this.p5]
      this.phoneNumbers = this.phoneNumbers.filter((x) => x !== '')
      postdata['phoneNumbers'] = this.phoneNumbers
      if (!postdata['deviceName']) {
        Toast('请填写设备名称')
        return
      }
      if (!postdata['cityCode']) {
        Toast('请选择城市')
        return
      }
      if (!postdata['installLocation']) {
        Toast('请填写安装地址')
        return
      }
      if (postdata['phoneNumbers'].length == 0) {
        Toast('请至少填写一位联系人信息')
        return
      }
      updateDevice(postdata).then(res => {
        Toast('保存成功')
        this.$router.replace('/')
      }).catch(res => {
      })
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
          jsApiList: [
            'getLocation',
            'hideMenuItems'
          ]
        })
        this.$wx.ready(res => {
          this.$wx.getLocation({
            debug: false,
            type: 'wgs84',
            success: res => {
              this.gaodeLat = res.latitude
              this.gaodeLng = res.longitude
            }
          })
        })
        this.$wx.error(function(res) {})
      }).catch(res => {
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
    overflow: auto;
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
