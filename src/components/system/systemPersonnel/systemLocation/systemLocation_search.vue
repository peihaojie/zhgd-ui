<template>
  <div id="systemLocation_search">
    <div class="content-box">
      <div class="message">
        <div class="inquire">
          <el-input v-model="name" placeholder="姓名或设备编号或电话"></el-input>
          <a class="button" @click="getHireSearch">搜索</a>
        </div>
        <div class="message-box">
          <ul>
            <li>
              姓名：
              <span>{{personnelData.userName}}</span>
            </li>
            <li>
              电话：
              <span>{{personnelData.userPhone}}</span>
            </li>
            <li>
              身份证号:
              <span>{{personnelData.idCode}}</span>
            </li>
            <li>
              所属公司：
              <span>{{personnelData.constructionName}}</span>
            </li>
            <li>
              工种:
              <span>{{personnelData.workType}}</span>
            </li>
            <li>
              入场日期：
              <span>{{personnelData.startTime}}</span>
            </li>
            <li>
              设备编号：
              <span>{{personnelData.imei}}</span>
            </li>
            <li>
              设备电量：
              <span v-if="personnelData.bat">{{personnelData.bat}}%</span>
            </li>
            <li>
              定位时间：
              <span>{{personnelData.watchDate}}</span>
            </li>
            <li>
              定位地址：
              <span>{{personnelData.address}}</span>
            </li>
            <li>
              <input type="checkbox" v-model="personnelData.laborContract" disabled />劳动合同
              <input type="checkbox" v-model="personnelData.tertiaryEducation" disabled />三级教育
              <input type="checkbox" v-model="personnelData.digitalTraining" disabled />数字化培训
            </li>
            <li v-if="personnelData.skilCertificate">
              技能证书:
              <img :src="personnelData.skilCertificate" style="width: 100%; height: 1.5rem" />
            </li>
          </ul>
        </div>
      </div>
      <div class="map" v-loading="loading">
        <el-amap
          ref="map"
          vid="amapDemo"
          :amap-manager="amapManager"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          :events="events"
          class="amap-demo"
        >
          <el-amap-polygon
            :path="path"
            strokeColor="#333"
            strokeWeight="2"
            fillColor="#fff"
            fillOpacity="0.5"
          ></el-amap-polygon>
        </el-amap>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#systemLocation_search {
  width: 100%;
  .content-box {
    display: flex;
    height: 9.45rem;
    border-radius: 0.04rem;
    background-color: #fff;
    padding: 0.3rem 0.3rem 0.3rem 0.2rem;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    .message {
      width: 3.17rem;
      .inquire {
        // height: .72rem;
        // transform: translateY(.18rem);
        position: relative;
        .el-input {
          width: 2.97rem;
          // height: .5rem;
          padding: 0.01rem;
          .el-input__inner {
            color: #5a5a5a;
            height: 0.4rem;
            line-height: 0.2rem;
            font-size: 0.16rem;
            padding-left: 0.1rem;
            border: 0.01rem solid #b6b6b6;
            border-radius: 0.05rem;
            // background-color: #000;
          }
          .el-input__prefix {
            display: none;
          }
        }
        .button {
          top: 0.6rem;
          right: 0.2rem;
          color: #fff;
          height: 0.34rem;
          width: 1.4rem;
          font-size: 0.18rem;
          text-align: center;
          position: absolute;
          transition: all 0.5s;
          line-height: 0.32rem;
          border-radius: 0.02rem;
          background-color: #ffd14f;
          border: 0.01rem solid #d4ad40;
          &:hover {
            background-color: #d4ad40;
          }
        }
      }
      .message-box {
        color: #5a5a5a;
        font-size: 0.16rem;
        margin-top: 0.64rem;
        width: 2.97rem;
        // transform: translateY(.4rem);
      }
    }
    .map {
      flex: 1;
    }
  }
}
</style>

<script>
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      projectId: sessionStorage.getItem("pid"), // 项目id
      circle: "", // 电子围栏位置信息
      marker: "", // 人员位置坐标点
      name: "", //需要查询的人名或设备编号或手机号码
      createDate: "", //需要查询的定位数据的日期
      localtionListData: {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        id: 1,
        imei: null,
        hid: null,
        haid: null,
        hname: null,
        phone: null,
        laowu: null,
        localtionList: [
          {
            searchValue: null,
            createBy: null,
            createTime: null,
            updateBy: null,
            updateTime: null,
            remark: null,
            params: {},
            id: null,
            imei: null,
            xloc: null,
            yloc: null,
            bat: null,
            rssi: null,
            watchDate: null,
            createDate: null,
            isPosition: null,
            address: null
          }
        ]
      }, //人员定位默认数据
      polygon: "",
      text: "",
      amapManager,
      zoom: 12,
      center: [114.003378, 22.571492],
      events: {
        init: o => {
          let polyline = new AMap.Polyline({
            path: [
              new AMap.LngLat(113.994194, 22.578189),
              new AMap.LngLat(114.004537, 22.563725),
              new AMap.LngLat(114.009601, 22.570383),
              new AMap.LngLat(114.006167, 22.580171)
            ],
            lineJoin: "round", //折线拐点样式
            showDir: true, //移动方向
            strokeWeight: 3, //线条宽度
            strokeColor: "#3366ff" //线条颜色
          });
          // polyline.setMap(o);
          let polygon = new AMap.Polygon({
            path: [
              new AMap.LngLat(113.992992, 22.581439),
              new AMap.LngLat(114.01033, 22.582786),
              new AMap.LngLat(114.010287, 22.562853),
              new AMap.LngLat(113.996898, 22.563329)
            ],
            fillColor: "#fff", // 多边形填充颜色
            fillOpacity: 0, //填充颜色透明度
            borderWeight: 1, // 线条宽度
            strokeColor: "#137ed2" // 线条颜色}
          });
          // polygon.setMap(o)

          // 渲染电子围栏
          this.circle = new AMap.Circle({
            center: [114.007675, 22.663599], // 圆心位置
            radius: 0, // 圆半径
            fillColor: "none", // 圆形填充颜色
            fillOpacity: 0, // 填充色透明度
            strokeColor: "#3979fe", // 描边颜色
            strokeWeight: 2 // 描边宽度
          });
          this.circle.setMap(o);
          // 人员位置坐标点
          this.marker = new AMap.Marker({
            position: [114.003378, 22.571492]
          });
          this.marker.setMap(o);
          this.marker.hide();
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          // alert('map clicked')
        }
      },
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
      getNameState: 0, // getName状态只调用一次
      personnelData: {
        id: 0,
        userName: "",
        userPhone: "",
        constructionName: "",
        imei: "",
        bat: "",
        watchDate: "",
        xloc: "",
        yloc: "",
        address: ""
      }, // 人员数据
      path: [],
      loading: false
    };
  },
  created() {
    this.getName();
  },
  methods: {
    // 获取实时监控页面传过来的值
    getName() {
      if (this.$route.query.orderId != undefined && this.getNameState == 0) {
        this.name = this.$route.query.orderId;
        this.getHireSearch();
        this.getNameState = 1;
      }
    },

    // 获取人员定位数据
    getHireSearch() {
      if (this.name) {
        this.loading = true;
        this.clear(this.personnelData);
        this.$axios
          .post(
            `/api/hireApi/getHireSearch?filed=${this.name}&projectId=${this.projectId}`
          )
          .then(res => {
            this.loading = false;
            if (
              res.data.code == 0 &&
              res.data.data.length &&
              !res.data.data[0].way
            ) {
              this.personnelData = res.data.data[0];
              let temp = res.data.data[0];
              this.circle.setRadius(temp.areaRadius);
              this.circle.setCenter([temp.areaXloc, temp.areaYloc]);
              this.center = [temp.xloc, temp.yloc];
              this.zoom = 14;
              this.marker.setPosition([temp.areaXloc, temp.areaYloc]);
              this.marker.show();
            } else if (
              res.data.code == 0 &&
              res.data.data.length &&
              res.data.data[0].way
            ) {
              this.personnelData = res.data.data[0];
              let temp = res.data.data[0];
              this.path.push(
                temp.localtion.map(a => new Array(a.xloc, a.yloc))
              );
              this.zoom = 14;
              this.center = [temp.xloc, temp.yloc];
              this.marker.setPosition([temp.xloc, temp.yloc]);
              this.marker.show();
            } else {
              this.$message({
                message: "未找到相关人员",
                type: "warning"
              });
            }
          });
        return;
      }
      this.$message({
        message: "输入框不得为空",
        type: "warning"
      });
    },

    // 清除数据
    clear(obj) {
      Object.keys(obj).forEach(key => {
        obj[key] = null;
      });
    }
  }
};
</script>