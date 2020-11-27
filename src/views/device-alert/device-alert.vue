<template>

  <div class="alert">
    <div class="alert-bg">

    </div>

    <van-nav-bar
      title="设备报警"
      @click-right="onClickRight"
      :fixed="true"
    />

    <div class="alert-con">
      <div class="bianhao flex flex-column">
        <div class="fs16 p5">
          设备编号
        </div>

        <div class="fs16 p5 line">
          20934080384503850385
        </div>

        <div class="fs16 p5">
          设备名称
        </div>

        <div class="fs16 p5 line">
          20934080384503850385
        </div>

        <div class="fs16 p5">
          设备地址
        </div>

        <div class="fs16 p5 line">
          20934080384503850385
        </div>

        <div class="fs16 p5">
          报警信息
        </div>

        <div class="fs16 p5 line">
          20934080384503850385
        </div>
      </div>
      <van-button type="primary" block class="chuli">已处理，关闭报警</van-button>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'device-alert',
  methods: {
    onClickRight() {
      Toast('按钮')
    }
  }
}
</script>

<style scoped>
  .alert-bg {
    width: 100vw;
    height: 255px;
    background-image: url('../../../static/img/alarm-bg.png');
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
    margin-bottom: 30px;
  }
  .chuli{
    background-color: #FDA300 !important;
    border: 0.02667rem solid #FDA300 !important;
  }
</style>
