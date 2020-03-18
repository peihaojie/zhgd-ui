<template>
  <div id="systemSafety_LocationSetting">
    <div class="content-box">
      <div class="main-box">
        <div class="AddList">
          <div class="button-box">
            <a
              class="add"
              @click="isShow=true, titleNmae='添加工区',modify=false,Preservation=false,Delete=true"
            >
              <i class="icon"></i>
              工区定位
            </a>
          </div>
          <div class="AddList-header">
            <span style=" font-weight: 600;font-size:.18rem;">公区列表</span>
            <span style="color:#0090ff;">▼</span>
          </div>
          <ul class="list-main">
            <li v-for="(item,index) in WorkAreaList" :key="index">
              <span>{{item.name}}</span>
              <span
                :longitude="item.longitude?item.longitude:'-'"
                :latitude="item.latitude?item.latitude:'-'"
                :radius="item.radius?item.radius:'-'"
                @click="isShow=true,setWorkAreaFunc(item),modify=true,Preservation=true,Delete=false"
              >设置</span>
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
                :radius="marker.radius"
                :fill-opacity="marker.fillOpacity"
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
              <el-amap-circle
                v-for="(circle ,index) in markerList"
                :key="index"
                :radius="circle.circles[0].radius"
                :center="circle.circles[0].center" 
                :fill-opacity="circle.circles[0].fillOpacity"
              ></el-amap-circle>
            </div>
          </el-amap>
        </div>
      </div>

      <div class="mark-box" v-if="isShow">
        <div class="NewTask-box">
          <div class="NewTask-header">
            <span></span>
            <span style="font-size:.20rem;">{{titleNmae}}</span>
            <span style="font-size:.30rem;" @click="isShow=false">×</span>
          </div>
          <div class="NewTask-main">
            <div class="item" style=" padding-left: 1rem;">
              <div class="item-text">
                工区名称
                <span style="color:red;">*</span>
              </div>
              <el-input v-model="WorkAreaName" placeholder="请输入工区名称" style="margin-left:.14rem;"></el-input>
            </div>
            <div class="item" style=" padding-left: 1rem;">
              <div class="item-text">
                选择半径
                <span style="color:red;">*</span>
              </div>
              <el-select v-model="Radius" placeholder="请选择半径">
                <el-option
                  v-for="(item, index) in RadiusList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">
                经度
                <span style="color:red;">*</span>
              </div>
              <el-input v-model="longitude" placeholder style="margin-left:.11rem;"></el-input>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">
                纬度
                <span style="color:red;">*</span>
              </div>
              <el-input v-model="latitude" placeholder style="margin-left:.11rem;"></el-input>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              地图定位
              <span style="color:red;">*</span>
              <span style="margin-left:.3rem;">请在地图上标记位置</span>
            </div>
            <div class="minMap">
              <el-amap class="amap-box" :vid="'minMap-vue'" :events="events"></el-amap>
            </div>
          </div>
          <div class="main-footer">
            <div
              class="Btn"
              v-show="modify"
              style="margin-right:.1rem;"
              @click="isShow=false,modifyFunc()"
            >修改</div>
            <div class="Btn" v-show="Delete" @click="AddWorkAreaN(),isShow=false">保存</div>
            <div
              class="Btn"
              v-show="Preservation"
              style="margin-left:.1rem;"
              @click="isShow=false,delectFunc()"
            >删除</div>
          </div>
        </div>
      </div>
    </div>
    <el-button :plain="true" @click="Success">成功</el-button>
    <el-button :plain="true" @click="fail">错误</el-button>
    <el-button :plain="true" @click="fails">错误</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //是否显示新增任务弹框
      isShow: false,
      //是否显示修改按钮
      modify: false,
      //是否显示删除按钮
      Delete: false,
      //是否显示保存按钮
      Preservation: false,
      //弹框标题
      titleNmae: "添加工区",
      //工区名称
      WorkAreaName: "",
      //工业区id
      WorkAreaID: "",
      //选择的经度
      longitude: "",
      //选择的纬度
      latitude: "",
      //获取项目id
      projectId: sessionStorage.getItem("pid"),
      //地图中心点
      center: [114.083372, 22.544146],
      //地图事件对象
      events: {
        click: e => {
          //获取点击地图的经纬度
          this.longitude = e.lnglat.lng;
          this.latitude = e.lnglat.lat;
        }
      },
      //地图数据对象
      markerList: [],
      //工区列表
      WorkAreaList: [],
      //工区半径
      Radius: 50,
      //工区半径下拉列表
      RadiusList: [
        {
          value: 50,
          label: 50
        },
        {
          value: 100,
          label: 100
        },
        {
          value: 200,
          label: 200
        },
        {
          value: 300,
          label: 300
        },
        {
          value: 400,
          label: 400
        },
        {
          value: 500,
          label: 500
        }
      ]
    };
  },
  mounted() {
    //获取工区列表
    this.getWorkAreaList();
  },
  methods: {
    //获取工区列表
    getWorkAreaList() {
      this.markerList = [];
      this.$axios
        .post(
          `http://localhost:3000/api/location/query?projectId=${this.projectId}`
        )
        .then(res => {
          //将返回的工区列表数据赋值给对象渲染到页面左侧工区列表
          this.WorkAreaList = res.data.data;
          //将工区列表的数据添加到地图对象数组中渲染地图坐标点
          this.WorkAreaList.forEach((item, key) => {
            if (item.longitude && item.latitude) {
              this.markerList.push({
                position: [item.longitude, item.latitude],
                content: `<div class='prompt'>${item.name}</div>`,
                visible: false,
                offset: [2, -15],
                circles: [
                  {
                    center: [item.longitude, item.latitude],
                    radius: item.radius,
                    fillOpacity: 0.5,
                    events: {
                      click: () => {
                        alert("click");
                      }
                    }
                  }
                ]
              });
            }
          });
          this.markerList.forEach((item, key) => {
            this.markerList[key].events = {
              mouseover: () => {
                this.markerList[key].visible = true;
              },
              mouseout: () => {
                this.markerList[key].visible = false;
              }
            };
          });
        });
    },
    //设置工区
    setWorkAreaFunc(item) {
      //切换弹框标题
      this.titleNmae = "设置工区";
      //获取工区名称
      this.WorkAreaName = item.name;
      //获取经度
      this.longitude = item.longitude;
      //获取纬度
      this.latitude = item.latitude;
      //获取id
      this.WorkAreaID = item.id;
    },
    //添加工区
    AddWorkAreaN() {
      var self = this;
      if (
        this.longitude != "" &&
        this.longitude != "" &&
        this.WorkAreaName != "" &&
        this.Radius != ""
      ) {
        this.$axios
          .post("http://localhost:3000/api/location/insert", {
            projectId: this.projectId,
            longitude: this.longitude,
            latitude: this.latitude,
            name: this.WorkAreaName,
            radius: this.Radius
          })
          .then(function(response) {
            if (response.data.code == 0) {
              //获取工区列表
              self.getWorkAreaList();
              self.Success();
            } else {
              self.fail();
            }
          });
      } else {
        self.fails();
      }
    },
    //修改工区
    modifyFunc() {
      var self = this;
      if (
        this.longitude != "" &&
        this.longitude != "" &&
        this.WorkAreaName != "" &&
        this.Radius != ""
      ) {
        this.$axios
          .post("http://localhost:3000/api/location/modify", {
            id: this.WorkAreaID,
            projectId: this.projectId,
            longitude: this.longitude,
            latitude: this.latitude,
            name: this.WorkAreaName,
            radius: this.Radius
          })
          .then(function(response) {
            if (response.data.code == 0) {
              //获取工区列表
              self.getWorkAreaList();
              self.Success();
            } else {
              self.fail();
            }
          });
      } else {
        self.fails();
      }
    },
    //删除工区
    delectFunc() {
      var self = this;
      this.$axios
        .post("http://localhost:3000/api/location/remove", {
          id: this.WorkAreaID
        })
        .then(function(response) {
          if (response.data.code == 0) {
            //获取工区列表
            self.getWorkAreaList();
            self.Success();
          } else {
            self.fail();
          }
        });
    },
    //操作成功弹框
    Success() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
    },
    //操作失败弹框
    fail() {
      this.$message({
        message: "操作失败",
        type: "warning"
      });
    },
    //处理输入框为s空提示
    fails() {
      this.$message({
        message: "输入框不能为空,操作失败!",
        type: "warning"
      });
    }
  }
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
        margin-top: 0.2rem;
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
          height: 6.5rem;
          background: #fff;
          .item {
            width: 100%;
            padding-top: 0.2rem;
            display: flex;
            align-items: center;
            padding-left: 1.2rem;
            .item-text {
              width: 1rem;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
            input {
              width: 3.58rem;
              height: 0.38rem;
              border: 0.01rem solid #b6b6b6;
              border-radius: 0.03rem;
            }
          }
        }
        .minMap {
          width: 4.9rem;
          height: 3.5rem;
          margin-left: 1rem;
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
          padding-top: 0.1rem;
          padding-left: 0.1rem;
          padding-right: 0.1rem;
        }
        .Btn {
          width: 1.61rem;
          height: 0.38rem;
          background-color: #ffd14f;
          border: 0.01rem solid #d4ad40;
          border-radius: 0.03rem;
          color: #fff;
          font-size: 0.2rem;
          text-align: center;
          line-height: 0.38rem;
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
</style>
