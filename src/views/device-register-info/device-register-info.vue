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
      deviceId: ''
    }
  },

  mounted() {
    // setTimeout(res => {
    //   console.log(this.$router.query.objAdd)
    // }, 200)
    console.log(this.$route.query.objAdd)
    if (this.$route.query.objAdd) {
      this.patchValue()
    }
    // if (this.$router.query.objCode) {
    //   this.patchValueCode()
    // }
  },
  methods: {
    patchValueCode() {
      this.info = JSON.parse(this.$route.query.objCode)
      this.deviceCategoryText = this.info.deviceCategoryText
      this.no = this.info.imei
    },
    patchValue() {
      this.info = JSON.parse(this.$route.query.objAdd)
      console.log(this.info)
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
      console.log(values)
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
      console.log(this.result)
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
      console.log(postdata)
      updateDevice(postdata).then(res => {
        Toast('保存成功')
        this.$router.replace('/')
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    }
  },
  watch: {
    $route(to, from) {
      console.log(from.path)// 从哪来
      console.log(to.path)// 到哪去
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
