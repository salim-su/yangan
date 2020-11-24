<template>
  <div class="login">
    <!--    <h1>我是login</h1>-->
    <!--    <h1>我是login</h1>-->
    <!--    <h1>我是login</h1>-->
    <!--    <h1>我是login</h1>-->

    <!--    <div>-->
    <!--      <van-count-down-->
    <!--        ref="countDown"-->
    <!--        millisecond-->
    <!--        :time="60000"-->
    <!--        :auto-start="false"-->
    <!--        format="ss"-->
    <!--        @finish="finish"-->
    <!--      />-->
    <!--      <van-grid clickable>-->
    <!--        <van-grid-item text="开始" icon="play-circle-o" @click="start" />-->
    <!--        <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />-->
    <!--        <van-grid-item text="重置" icon="replay" @click="reset" />-->
    <!--      </van-grid>-->
    <!--    </div>-->

    <div class="login-content">
         <div class="fs12">手机号登录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'login',
  mounted() {
    Toast('倒计时结束')
  },
  components: {
    [Toast.name]: Toast
  },
  methods: {

    start() {
      this.$refs.countDown.start()
    },
    pause() {
      this.$refs.countDown.pause()
    },
    reset() {
      this.$refs.countDown.reset()
    },
    finish() {
    }
  }
}
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../../static/img/login-bg.png');
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  /*background-color: #42b983;*/
}
.login-content {
  background-color: #ccc;
  width: 310px;
  height: 350px;
  margin-top: 155px;
}
</style>
