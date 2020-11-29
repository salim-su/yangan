<!-- home -->
<template>
  <div class="con">
    <van-nav-bar
      title="报警记录列表"
      :fixed="true"
    />

    <div class="index-bg">

    </div>

    <div class="d2">

      <div class="d2-item" v-for="(item,index) of list" :key="index">
        <div class="cell-content flex flex-column">
          <div class="cell1">
            <img src="../../../static/img/dingwei.png" alt="" class="imgs">
            <div class="name">{{item.deviceCategoryText}} {{item.deviceInstallLocation}}</div>
          </div>
          <div class="cell2">
            <div class="name">{{item.alarmCategoryText}}</div>
          </div>
          <div class="cell3">
            <div class="name">{{item.creationTime}}</div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import { getAlarmList } from '../../api/user'

export default {
  data() {
    return {
      wechat: `${this.$cdn}/wx/640.gif`,
      list: []
    }
  },
  computed: {},
  mounted() {
    this.getAlarmListInfo()
  },
  methods: {
    getAlarmListInfo() {
      getAlarmList().then(res => {
        this.list = res.data
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

  .d2 {
    margin-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    overflow: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 50px;
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

  .imgs {
    width: 16px;
    /*height: 18px;*/
  }

  .name {
    font-size: 16px;
  }

  .d2-item {
    width: 336px;
    height: 96px;
    background-image: url("../../../static/img/wengan.png");
    margin-bottom: 20px;
    background-size: cover;
  }

  .cell-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 70px;
    justify-content: space-evenly;
    padding-top: 5px;
    padding-bottom: 5px;
    /*padding-top: 15px;*/
  }

  .cell1, .cell2 {
    display: flex;
    align-items: center;
  }
</style>

