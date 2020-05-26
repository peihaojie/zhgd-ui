<template>
  <div id="systemLocation_home">
    <div class="content-box">
      <div class="nav">
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item,index) in workAreaList"
            :title="item.projectName"
            name="1"
            :key="index"
          >
            <el-collapse @change="handleChange" accordion>
              <el-collapse-item
                :title="item2.areaName"
                :name="item2.areaId"
                v-for="item2 in item.areaList"
                :key="item2.areaId"
              >
                <el-collapse accordion>
                  <el-collapse-item
                    :title="`在线${item2.line.onLine.length}人，${getIn(item2.line.onLine)}人在工区内`"
                  >
                    <a
                      v-for="onLine in item2.line.onLine"
                      :key="onLine.userId"
                      style="color:#4a4a4a"
                      @click="$router.push({ path: '/systemLocation_search',query: { orderId: onLine.userName}})"
                    >
                      {{onLine.userName}}
                      <span class="online" v-if="onLine.in">在线</span>
                      <span class="offline" v-else>在线(离开工区)</span>
                    </a>
                  </el-collapse-item>
                  <el-collapse-item :title="`不在线(${item2.line.offLine.length}人)`">
                    <a
                      v-for="offLine in item2.line.offLine"
                      :key="offLine.userId"
                      @click="$router.push({ path: '/systemLocation_search',query: { orderId: offLine.userName}})"
                    >
                      {{offLine.userName}}
                      <span class="offline">不在线</span>
                    </a>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="map">
        <el-amap
          ref="map"
          vid="amapDemo"
          :amap-manager="amapManager"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          class="amap-demo"
        >
          <el-amap-polygon
            :path="path"
            strokeColor="#333"
            strokeWeight="2"
            fillColor="#fff"
            fillOpacity="0.5"
          ></el-amap-polygon>
          <template v-if="markers.length">
            <el-amap-marker
              v-for="(marker, index) in markers"
              :key="index+Math.random()*10000"
              :position="marker.position"
              :events="marker.events"
            ></el-amap-marker>
            <el-amap-info-window
              v-for="(marker, index) in markers"
              :key="index+Math.random()*10000"
              :position="marker.position"
              :content="marker.content"
              :visible="marker.visible"
              :offset="[0, -35]"
            ></el-amap-info-window>
          </template>
        </el-amap>
        <div class="alarm" @click="dialog">
          <i class="spectacularsAlarm"></i>
        </div>
        <div class="alarmList" v-show="alarmClick">
          <div class="corner"></div>
          <ul ref="scroll">
            <li v-for="(value, name, index) in alarmList" :key="index" @click="examine(name)">
              <i
                :class="name=='countSos'?'spectacularsSOS'
                :name=='countFall'?'spectacularsTumble'
                :name=='countMove'?'spectacularsStand'
                :'spectacularsElectricity'"
              ></i>
              {{getWarningName(name, value)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#systemLocation_home {
  width: 100%;
  .content-box {
    display: flex;
    height: 9.45rem;
    border-radius: 0.04rem;
    background-color: #fff;
    padding: 0.3rem 0.3rem 0.3rem 0.2rem;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    .nav {
      width: 3.17rem;
      // height: 100%;
      overflow: auto;
      .el-collapse {
        border: 0;
        // transform: translateY(.12rem);
        .el-collapse {
          .el-collapse-item__header {
            font-size: 0.16rem;
            background-color: #fff;
          }
        }
        .el-collapse-item__header {
          border: 0;
          color: #4a4a4a;
          font-size: 0.18rem;
          line-height: 0.2rem;
          padding-left: 0.14rem;
          background-color: #c5e8ff;
        }
        .el-collapse-item__wrap {
          padding-left: 0.18rem;
          border: 0;
          overflow: visible;
          .el-collapse-item__content {
            padding-bottom: 0;
            padding-left: 0.16rem;
            a {
              display: block;
              width: 100%;
              height: 100%;
              font-size: 0.14rem;
              position: relative;
              .online {
                color: #24e974;
                position: absolute;
                right: 0.5rem;
                // top: 0;
              }
              .offline {
                color: #fb497c;
                position: absolute;
                right: 0.5rem;
              }
            }
          }
        }
      }
    }
    .map {
      flex: 1;
    }
    .alarm {
      position: absolute;
      top: 1rem;
      right: 1rem;
      // background: red;
      cursor: pointer;
      .spectacularsAlarm {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        background-image: url("../../../../../static/images/spectacularsAlarm.png");
        background-position: 100% 100%;
        background-size: 100%;
      }
    }
    .alarmList {
      position: absolute;
      top: 1.6rem;
      right: 1rem;
      width: 2rem;
      height: 2.2rem;
      background: rgba(255, 255, 255, 0.85);
      color: #3375fe;
      font-size: 0.2rem;
      line-height: 0.48rem;
      padding: 0 0.1rem;
      .corner {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.95);
        transform: rotate(45deg);
        position: absolute;
        top: -0.1rem;
        right: 0.2rem;
      }
      ul {
        width: 100%;
        // height: 3.2rem;
        overflow-y: auto;
        position: relative;
        li {
          // border-bottom: 1px solid #949197;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          i {
            display: inline-block;
            width: 0.18rem;
            height: 0.24rem;
            background-size: 100% 100%;
            vertical-align: sub;
            margin-right: 0.1rem;
          }
          .spectacularsSOS {
            background-image: url("../../../../../static/images/spectacularsSOS.png");
          }
          .spectacularsTumble {
            background-image: url("../../../../../static/images/systemSpectacularsTumble.png");
          }
          .spectacularsStand {
            background-image: url("../../../../../static/images/systemSpectacularsStand.png");
          }
          .spectacularsElectricity {
            background-image: url("../../../../../static/images/systemSpectacularsElectricity.png");
          }
        }
      }
      ul::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>

<script>
import mixin from "@/utils/mixin.js";
let amapManager = new VueAMap.AMapManager();
export default {
  mixins: [mixin],
  data() {
    return {
      text: "",
      amapManager,
      circle: "", // 电子围栏位置信息
      zoom: 12,
      center: [114.014129, 22.571492],
      plugin: [
        {
          pName: "ToolBar",
          direction: false,
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        }
      ],
      projectId: sessionStorage.getItem("pid"), //项目id
      workAreaList: "", // 工区列表
      alarmClick: false, // 报警弹窗显示
      alarmList: {}, // 报警列表
      scrollPlace: 0, // 滚动的位置
      clearScroll: "", // 清除滚动
      warningTypeList: [
        {
          label: "SOS报警",
          value: 0
        },
        {
          label: "摔跌报警",
          value: 1
        },
        {
          label: "久站不动报警",
          value: 2
        },
        {
          label: "低电量报警",
          value: 3
        }
      ], // 报警搜索列表
      path: [],
      markers: []
    };
  },
  created() {
    // this.getMonitoringData()
    this.getHirePeople();
    // this.getDay()
  },
  methods: {
    // 导航栏点击事件
    handleChange(val) {
      let temp = [];
      this.workAreaList[0].areaList.forEach(item => {
        if (val == item.areaId && !item.way) {
          temp.push(item.areaXloc);
          temp.push(item.areaYloc);
          // 设置电子围栏圆心
          this.circle.setCenter(temp);
          // 设置电子围栏半径
          this.circle.setRadius(item.areaRadius);
          // 设置地图中心点
          this.center = temp;
          // 设置地图缩放等级
          this.zoom = 14;
          return
        }
        if (val == item.areaId && item.way) {
          this.zoom = 14;
          this.center = [item.localtion[0].xloc, item.localtion[0].yloc];
          this.markers = new Array();
          item.line.onLine.forEach(a => {
            let obj = {
              position: [a.userXloc, a.userYloc],
              content: a.userName,
              visible: false,
              events: {
                mouseover: () => (obj.visible = true),
                mouseout: () => (obj.visible = false),
                click: () =>
                  this.$router.push({
                    path: "/systemLocation_search",
                    query: { orderId: obj.content }
                  })
              }
            };
            this.markers.push(obj);
          });
          this.path.push(item.localtion.map(a => new Array(a.xloc, a.yloc)));
        }
      });
    },

    // 判断是否在区域内
    getIn(list) {
      let num = 0;
      list.forEach(a => {
        if (a.in) num++;
      });
      return num;
    },

    // 获取工区列表
    getHirePeople() {
      this.$axios
        .post(`/api/hireApi/getHirePeople?projectId=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data[0].areaList.forEach(item => {
              let line = item.line
              line.offLine = line.offLine ? line.offLine : [];
              line.onLine = line.onLine ? line.onLine : [];
              let path = new Array();
              path.push(item.localtion.map(a => new Array(a.xloc, a.yloc)));
              line.onLine.forEach(a => {
                a.in = AMap.GeometryUtil.isPointInRing(
                  new Array(a.userXloc, a.userYloc),
                  path
                );
              });
            });
            this.workAreaList = res.data.data;
          }
        });
    },

    // 获取报警数据，并弹窗
    dialog() {
      this.alarmClick = !this.alarmClick;
      if (this.alarmClick) {
        this.$axios
          .post(
            `/api/pcEquipmentWarning/warningCount?projectId=${this.projectId}`
          )
          .then(res => {
            if (res.data.code == 0) {
              this.alarmList = res.data.data;
              // setTimeout(() => {
              //   this.startScroll()
              // }, 500);
            }
          });
      } else {
        // clearInterval(this.clearScroll)
        // this.$refs.scroll.scrollTop = 0
      }
    },

    // 滚动
    startScroll() {
      if (this.clearScroll) clearInterval(this.clearScroll);
      this.clearScroll = setInterval(() => {
        this.$refs.scroll.scrollTop += 1;
        if (this.scrollPlace == this.$refs.scroll.scrollTop) {
          this.$refs.scroll.scrollTop = 0;
        } else {
          this.scrollPlace = this.$refs.scroll.scrollTop;
        }
      }, 50);
    },

    // 返回报警名称
    getWarningName(name, value) {
      if (name == "countFall") {
        return "摔倒报警" + value + "人";
      } else if (name == "countBat") {
        return "低电量报警" + value + "台";
      } else if (name == "countSos") {
        return "SOS报警" + value + "人";
      } else {
        return "久站未动报警" + value + "人";
      }
    },

    //查看详情
    examine(name) {
      this.$router.push({
        path: "/systemLocation_alarm",
        query: {
          warningType:
            name == "countSos"
              ? 0
              : name == "countFall"
              ? 1
              : name == "countMove"
              ? 2
              : 3
        }
      });
    }
  },
  beforeDestroy() {
    // if (this.clearScroll) clearInterval(this.clearScroll)
  }
};
</script>