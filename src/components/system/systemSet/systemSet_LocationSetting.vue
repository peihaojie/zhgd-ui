<template>
  <div id="systemSafety_LocationSetting">
    <div class="content-box">
      <div class="main-box">
        <div class="AddList">
          <div class="button-box">
            <a class="add" @click="isShow=true">
              <i class="icon"></i>
              添加工区
            </a>
          </div>
          <div class="AddList-header">
            <span style=" font-weight: 600;font-size:.18rem;">公区列表</span>
            <span style="color:#0090ff;">▼</span>
          </div>
          <ul class="list-main">
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
            <li>
              <span>龙创科技园</span>
              <span>设置</span>
            </li>
          </ul>
        </div>
        <div class="Map" id="Map">
          <el-amap class="amap-box" :vid="'amap-vue'">
            <div v-if="markerList.length != 0">
              <el-amap-marker
                v-for="(marker, index) in markerList"
                :key="index"
                :position="marker.position"
                :events="marker.events"
                :icon="marker.icon"
                animation="AMAP_ANIMATION_DROP"
              ></el-amap-marker>
              <el-amap-info-window
                v-for="(window, index) in markerList"
                :key="window.content+index"
                :position="window.position"
                :visible="window.visible"
                :content="window.content"
                :offset="window.offset"
              ></el-amap-info-window>
            </div>
          </el-amap>
        </div>
      </div>

      <div class="mark-box" v-if="isShow">
        <div class="NewTask-box">
          <div class="NewTask-header">
            <span></span>
            <span style="font-size:.20rem;">添加工区</span>
            <span style="font-size:.30rem;" @click="isShow=false">×</span>
          </div>
          <div class="NewTask-main">
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">
                选择工区
                <span style="color:red;">*</span>
              </div>
              <el-select v-model="SelectWorkArea" placeholder="请选择工业区">
                <el-option
                  v-for="(item, index) in SelectWorkAreaList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
              <span class="item-text" style="color:#0090ff;padding-left:.1rem;">添加工区</span>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">
                选择半径
                <span style="color:red;">*</span>
              </div>
              <el-select v-model="SelectWorkArea" placeholder="请选择半径">
                <el-option
                  v-for="(item, index) in SelectWorkAreaList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="main-footer">
            <div class="Btn">保存</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false, //是否显示新增任务弹框
      center: [114.083372, 22.544146],
      //   markers: [
      //     {
      //       position: [114.02769, 22.655081],
      //       events: {
      //         click: () => {
      //           alert("click marker");
      //         },
      //         dragend: e => {
      //           console.log("---event---: dragend");
      //           this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
      //         }
      //       }
      //     }
      //   ],
      markerList: [
        {
          position: [114.02769, 22.655081],
          content:
            "<div class='prompt'>2019年龙岗区深圳河流域消除黑臭及河流水质保障工程——布吉街道</div>",
          visible: false,
          offset: [2, -15],
          events: {
            mouseover: () => {
              this.markerList[0].visible = true;
            },
            mouseout: () => {
              this.markerList[0].visible = false;
            }
          }
        },
        {
          position: [114.099038, 22.568989],
          content:
            "<div class='prompt'>笔架山水厂-东湖水厂DN1200 原水管修复工程设计采购施工总承包（EPC）项目</div>",
          visible: false,
          offset: [2, -15],
          events: {
            mouseover: () => {
              this.markerList[1].visible = true;
            },
            mouseout: () => {
              this.markerList[1].visible = false;
            }
          }
        }
      ],
      SelectWorkArea: "", //选择工区
      //选择工区下拉列表
      SelectWorkAreaList: [
        {
          value: 1,
          label: "所有"
        }
      ]
    };
  },

  methods: {}
};
</script>
<style lang="less">
#systemSafety_LocationSetting {
  .content-box {
    position: relative;
    width: 100%;
    height: 85%;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    border-radius: 0.04rem;
    .main-box {
      width: 100%;
      height: 100%;
      padding: 0.2rem 0.2rem 0.25rem 0.2rem;
      display: flex;
      .AddList {
        width: 28%;
        height: 100%;
        .button-box {
          height: 0.3rem;
          margin-bottom: 0.1rem;
          a {
            float: left;
            height: 0.3rem;
            color: #0090ff;
            font-size: 0.14rem;
            transition: all 0.5s;
            margin-right: 0.2rem;
            line-height: 0.28rem;
            border-radius: 0.02rem;
            padding-right: 0.09rem;
            border: 0.01rem solid #0090ff;
            &:hover {
              color: #fff;
              background-color: #0090ff;
            }
            .icon {
              width: 0.37rem;
              height: 0.28rem;
              transition: all 0.5s;
              display: inline-block;
              vertical-align: middle;
              background-repeat: no-repeat;
              background-position: center center;
            }
          }
          .add {
            .icon {
              background-image: url("../../../../static/images/system-new.png");
            }
            &:hover {
              .icon {
                background-image: url("../../../../static/images/system-newHover.png");
              }
            }
          }
        }
        .AddList-header {
          width: 100%;
          height: 0.3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #c5e8ff;
          padding: 0 7% 0 5%;
        }
        .list-main {
          width: 100%;
          height: 90%;
          // overflow: hidden;
          // overflow-y: scroll;
          li {
            width: 100%;
            padding: 0 5%;
            height: 0.35rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
            font-size: 0.16rem;
            span:nth-child(2) {
              color: #0090ff;
              cursor: pointer;
            }
          }
        }
      }
      .Map {
        width: 72%;
        height: 100%;
        margin-left: 1%;
      }
    }
    .mark-box {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 1000;
      .NewTask-box {
        width: 7rem;
        height: 6rem;
        margin-left: 4.5rem;
        margin-top: 1rem;
        .NewTask-header {
          width: 100%;
          padding: 0.1rem 0.2rem;
          display: flex;
          color: #fff;
          justify-content: space-between;
          background: -webkit-gradient(
            linear,
            left top,
            right top,
            from(#6cc4ff),
            to(#489cff)
          );
          background: linear-gradient(to right, #6cc4ff, #489cff);
          border-radius: 0.1rem 0.1rem 0 0;
        }
        .NewTask-main {
          width: 100%;
          height: 1.5rem;
          background: #fff;
          .item {
            width: 100%;
            padding-top: 0.2rem;
            display: flex;
            padding-left: 1.2rem;
            .item-text {
              width: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            input {
              width: 3.58rem;
              height: 0.38rem;
              border: 0.01rem solid #b6b6b6;
              border-radius: 0.03rem;
            }
          }
        }
         .main-footer {
          width: 100%;
          height: 0.6rem;
          border-radius: 0 0 0.1rem 0.1rem;
          border-top: 1px solid #ccc;
          background: #f7f7f7;
          display: flex;
          justify-content: center;
          align-content: center;
          .Btn {
            width: 1.61rem;
            height: 0.38rem;
            margin-top: .1rem;
            background-color: #ffd14f;
            border: 0.01rem solid #d4ad40;
            border-radius: 0.03rem;
            color: #fff;
            font-size: 0.2rem;
            text-align: center;
            line-height: 0.40rem;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #fcb928;
            }
          }
        }
      }
    }
  }
}
</style>
