<template>
  <div class="login">
    <div class="login-content">
      <div class="phone">手机号登录</div>

      <van-cell-group class="mt15" :border="false">
        <van-field type="number" v-model="phoneValue" placeholder="请输入手机号"/>
      </van-cell-group>

      <van-cell-group class="flex mt15 align-items-center" :border="false">
        <van-field type="number" v-model="captchaValue" placeholder="请输入验证码"/>
        <van-button plain type="info" class="spec-btn" @click="start">

          <template v-if="flag">获取验证码</template>
          <template v-else>
            <van-count-down
              ref="countDown"
              millisecond
              :time="60000"
              :auto-start="false"
              format="ss秒"
              @finish="finish"
            />
          </template>

        </van-button>
      </van-cell-group>

      <van-button color="#7232dd" class="mt30" block @click="login">登 录</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { loginSystem, sendCode } from '../../api/user'
export default {
  name: 'login',
  data() {
    return {
      phoneValue: '',
      captchaValue: '',
      flag: true,
      openid: '',
      nickname: ''
    }
  },
  mounted() {
    if (window.localStorage.getItem('token')) {
      this.$router.replace('/')
    }
    console.log(this.$route.query.openid)
    // Toast('倒计时结束'
    if (this.$route.query.openid) {
      this.openid = this.$route.query.openid
    }
    if (this.$route.query.nickname) {
      this.nickname = this.$route.query.nickname
    }
  },
  components: {
    [Toast.name]: Toast
  },
  methods: {
    start() {
      if (!this.phoneValue) {
        Toast('请输入手机号')
      } else {
        const postData = {
          phoneNumber: this.phoneValue
        }
        sendCode(postData).then(res => {
          this.flag = false
          Toast('发送验证码成功')
          setTimeout(res => {
            this.$refs.countDown.start()
          }, 300)
        }).catch(res => {
        })
      }
    },
    finish() {
      this.flag = true
    },
    login() {
      if (!this.phoneValue) {
        Toast('请输入手机号')
        return
      }
      if (!this.captchaValue) {
        Toast('请输入验证码')
        return
      }
      const postdata = {
        nickName: this.nickname,
        wechatOpenid: this.openid,
        phoneNumber: this.phoneValue,
        code: this.captchaValue
      }
      loginSystem(postdata).then(res => {
        localStorage.setItem('token_type', res.token_type)
        localStorage.setItem('nick_name', res.nick_name)
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('phone', res.user_name)
        this.$router.push('/')
      }).catch(res => {
        Toast('验证码输入错误')
      })
    }
  }
}
</script>

<style scoped>
  .login {
    width: 375px;
    height: 667px;
    background-image: url('../../../static/img/login-bg.png');
    background-size:cover;
    /*background-repeat: no-repeat;*/
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    /*background-color: #42b983;*/
  }

  .login-content {
    /*background-color: #ccc;*/
    width: 310px;
    height: 350px;
    margin-top: 155px;
    box-sizing: border-box;
    padding: 20px;
  }

  .phone {
    font-size: 24px;
    color: #5626B8;
  }

  .van-field {
    padding-left: 0;
  }

  .spec-btn {
    width: 155px;
    height: 30px;
  }

  .van-cell::after {
    display: none;
  }

  .van-cell-group {
    border-bottom: 1px solid #e3e3e3;
  }
</style>
