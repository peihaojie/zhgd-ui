<template>
  <div id="systemSafety_TaskArrangement">
    <div class="content-box">
      <div class="searchWrapp">
        <div class="searchBox">
          <ul>
            <li>
              任务时间：
              <el-select v-model="MissionTime" placeholder="请选择任务时间">
                <el-option
                  v-for="(item, index) in option1"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </li>
            <li>
              任务类型：
              <el-select v-model="MissionType" placeholder="请选择任务类型">
                <el-option
                  v-for="(item, index) in option2"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </li>
            <li>
              巡查状态：
              <el-select v-model="InspectingOfficer" placeholder="请选择巡查状态">
                <el-option
                  v-for="(item, index) in option4"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </li>
            <li>
              巡查人：
              <el-select v-model="PatrolState" placeholder="请选择巡查人">
                <el-option
                  v-for="(item, index) in option4"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </li>
          </ul>
          <div class="btn" @click="getInspectionRecordList">搜索</div>
        </div>
      </div>
      <div class="tableBox">
        <div class="button-box">
          <a class="new" @click="NewTask,isShow=true">
            <i class="icon"></i>
            新增任务
          </a>
          <a class="compile">
            <i class="icon"></i>
            修改任务
          </a>
        </div>
        <el-table :data="allTableData" stripe border :cell-style="cellStyle">
          <el-table-column type="index" label="序号" width="80" :index="indexMethod">
            <!-- <template slot-scope="scope" class="number">
                      <div class="number" style="line-height:0.7rem">{{scope.row.number}}</div>
            </template>-->
          </el-table-column>
          <el-table-column prop="problem" label="任务" width="280">
            <template slot-scope="scope">
              <div class="problem">
                <p>{{scope.row.safetyDescribe}}</p>
                <p>
                  <span
                    v-if="scope.row.gradeName=='月计划'"
                    class="problemBlue problemTu"
                  >{{scope.row.gradeName}}</span>
                  <span
                    v-else-if="scope.row.gradeName=='周计划'"
                    class="problemBlue problemTu"
                  >{{scope.row.gradeName}}</span>
                  <span
                    v-else-if="scope.row.gradeName=='日计划'"
                    class="problemYellow problemTu"
                  >{{scope.row.gradeName}}</span>
                  <span v-else class="problemGreen problemTu">{{scope.row.gradeName}}</span>
                  <span style="margin-left:0.05rem">{{scope.row.hiddenName}}</span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="examine" label="时间" width="280">
            <template slot-scope="scope">
              <div class="examine">
                <p>{{scope.row.initiatorTime}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="repair" label="检查人" width="279">
            <template slot-scope="scope">
              <div class="repair">
                <p>{{scope.row.rectifyName}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="工区" width="358">
            <template slot-scope="scope">
              <div class="time" style="line-height:0.7rem">{{scope.row.areaName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="359">
            <template slot-scope="scope">
              <div
                class="status"
                style="line-height:0.7rem;color:#3ada76"
                v-if="scope.row.status==1"
              >已巡查</div>
              <div
                class="status"
                style="line-height:0.7rem;color:#feb37f"
                v-else-if="scope.row.status==2"
              >未开始</div>
              <div
                class="status"
                style="line-height:0.7rem;color:#ff7a81"
                v-else-if="scope.row.status==3"
              >超时</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="fenye">
        <!-- 分页的两个事件 -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange"-->
        <el-pagination
          :current-page="pageNum"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </div>
      <div class="mark-box" v-if="isShow">
        <div class="NewTask-box">
          <div class="NewTask-header">
            <span></span>
            <span style="font-size:.20rem;">新增任务</span>
            <span style="font-size:.30rem;" @click="NewTask,isShow=false">×</span>
          </div>
          <div class="NewTask-main">
            <div class="item">
              <div class="item-text">任务名称<span style="color:red;">*</span></div>
              <el-input v-model="MissionName" placeholder="请输入任务名称"></el-input>
            </div>
            <div class="item">
              <div class="item-text">任务描述<span style="color:red;">*</span></div>
              <el-input v-model="TaskDescription" type="textarea" :rows="2" placeholder="请描述..."></el-input>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">选择工区<span style="color:red;">*</span></div>
              <el-select v-model="SelectWorkArea" placeholder="请选择工业区">
                <el-option
                  v-for="(item, index) in SelectWorkAreaList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">选择检查人<span style="color:red;">*</span></div>
              <el-select v-model="SelectWorkArea" placeholder="请选择">
                <el-option
                  v-for="(item, index) in SelectWorkAreaList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">任务类型<span style="color:red;">*</span></div>
              <el-select v-model="SelectWorkArea" placeholder="请选择">
                <el-option
                  v-for="(item, index) in SelectWorkAreaList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div class="item" style=" padding-left: 1.06rem;">
              <div class="item-text">选择时间<span style="color:red;">*</span></div>
              <div class="time">
                <el-date-picker
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
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
      MissionTime: "", //任务时间
      MissionType: "", //任务类型
      PatrolState: "", //巡查状态
      InspectingOfficer: "", //巡查人
      allTableData: [], // 表格数据
      pageNum: 1, // 当前页
      pageSize: 8, // 每页显示条数
      pageTotal: 0, // 总条数
      isShow: false, //是否显示新增任务弹框
      MissionName: "", //任务名称
      TaskDescription: "", //任务描述
      SelectWorkArea: "", //选择工区
      //任务时间下拉框数据列表
      option1: [
        {
          value: 1,
          label: "所有"
        }
      ],
      //任务类型下拉框数据列表
      option2: [
        {
          value: 1,
          label: "所有"
        }
      ],
      //巡查状态下拉框数据列表
      option3: [
        {
          value: 1,
          label: "所有"
        }
      ],
      //巡查人下拉框数据列表
      option4: [
        {
          value: 1,
          label: "所有"
        }
      ],
      //选择工区下拉列表
      SelectWorkAreaList: [
        {
          value: 1,
          label: "所有"
        }
      ]
    };
  },
  created() {
    this.getInspectionRecordList();
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageNum = val;
      this.getInspectionRecordList();
    },

    // 序号
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },

    // 获取检查记录列表
    getInspectionRecordList() {
      this.allTableData = [
        {
          safetyId: 87,
          status: 1,
          safetyDescribe: "巡查整个工业区",
          gradeName: "月计划",
          areaName: "科伦特工业区",
          hiddenName: "重点巡查排污管道",
          initiatorTime: "2019-08-30",
          rectifyName: "某某某",
          constructionName: "深圳市鹏城瑞泰投资有限公司",
          safetyDeadline: "2019-08-31 00:00:00"
        },
        {
          safetyId: 87,
          status: 2,
          safetyDescribe: "巡查整个工业区",
          gradeName: "周计划",
          areaName: "科伦特工业区",
          hiddenName: "重点巡查排污管道",
          initiatorTime: "2019-08-30",
          rectifyName: "某某某",
          constructionName: "深圳市鹏城瑞泰投资有限公司",
          safetyDeadline: "2019-08-31 00:00:00"
        },
        {
          safetyId: 87,
          status: 3,
          safetyDescribe: "巡查整个工业区",
          gradeName: "日计划",
          areaName: "科伦特工业区",
          hiddenName: "重点巡查排污管道",
          initiatorTime: "2019-08-30",
          rectifyName: "某某某",
          constructionName: "深圳市鹏城瑞泰投资有限公司",
          safetyDeadline: "2019-08-31 00:00:00"
        },
        {
          safetyId: 87,
          status: 1,
          safetyDescribe: "巡查整个工业区",
          gradeName: "月计划",
          areaName: "科伦特工业区",
          hiddenName: "重点巡查排污管道",
          initiatorTime: "2019-08-30",
          rectifyName: "某某某",
          constructionName: "深圳市鹏城瑞泰投资有限公司",
          safetyDeadline: "2019-08-31 00:00:00"
        }
      ];
      this.pageTotal = this.allTableData.length;
    },

    // 表格样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return "text-align: center";
      }
    },
    //新增任务方法
    NewTask() {}
  }
};
</script>
<style lang="less">
#systemSafety_TaskArrangement {
  .content-box {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    border-radius: 0.04rem;
    .top {
      height: 0.5rem;
      width: 100%;
      position: relative;
      width: 100%;
      font-size: 0.18rem;
      padding-left: 0.2rem;
      border-bottom: 1px solid #f7f7f7;
      ul {
        height: 0.5rem;
        transform: translateX(-0.35rem);
        li {
          cursor: pointer;
          height: 0.5rem;
          margin-left: 0.61rem;
          line-height: 0.5rem;
          float: left;
        }
        li.active {
          color: #0090ff;
          border-bottom: 0.02rem solid #0090ff;
          box-sizing: border-box;
        }
      }
    }
    .searchWrapp {
      width: 100%;
      height: 1.7rem;
      background: #f7f7f7;
    }
    .searchBox {
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      position: relative;

      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-left: 0.2rem;
        li {
          margin-top: 0.2rem;
          width: 3.8rem;
          font-size: 0.18rem;
          .el-input {
            width: 2.58rem;
            height: 0.38rem;
          }
          input {
            width: 2.58rem;
            height: 0.38rem;
            border: 0.01rem solid #b6b6b6;
            border-radius: 0.03rem;
          }
          /deep/.el-input__icon {
            width: 0.25rem;
            line-height: 0.4rem;
            font-size: 0.14rem !important;
          }
        }
      }
      .btn {
        width: 1.61rem;
        height: 0.38rem;
        background-color: #ffd14f;
        border: 0.01rem solid #d4ad40;
        border-radius: 0.03rem;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.38rem;
        position: absolute;
        right: 0.28rem;
        bottom: 0.37rem;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #fcb928;
        }
      }
    }

    .el-table {
      width: 16.38rem;
      th {
        padding: 0;
        div {
          color: #000;
          height: 0.35rem;
          line-height: 0.35rem;
          background-color: #c5e8ff;
          font-size: 0.16rem;
        }
      }
      td {
        padding: 0;
        div {
          // height: 0.7rem;
          color: #646464;
          font-size: 0.16rem;
        }
      }
    }
    .tableBox {
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      //   .el-table_1_column_1 > div {
      //   // background-color: #000!important;
      //   line-height: 0.7rem!important;
      //   text-align: center;
      // }
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
        .new {
          .icon {
            background-image: url("../../../../static/images/system-new.png");
          }
          &:hover {
            .icon {
              background-image: url("../../../../static/images/system-newHover.png");
            }
          }
        }
        .compile {
          .icon {
            background-image: url("../../../../static/images/system-compile.png");
          }
          &:hover {
            .icon {
              background-image: url("../../../../static/images/system-compileHover.png");
            }
          }
        }
      }
      .problem {
        padding-top: 0.12rem;
        .problemTu {
          display: inline-block;
          width: 0.54rem;
          height: 0.19rem;
          border-radius: 0.19rem;
          line-height: 0.19rem;
          color: #fff;
          text-align: center;
          font-size: 0.14rem;
        }
        .problemBlue {
          background-color: #0090ff;
        }
        .problemYellow {
          background-color: #feb37f;
        }
      }
      .examine {
        padding-top: 0.12rem;
      }
      .repair {
        padding-top: 0.12rem;
      }
    }
    .fenye {
      position: absolute;
      right: 0.6rem;
      bottom: 0.3rem;
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
          height: 4.2rem;
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
            textarea {
              width: 3.58rem;
            }

            input {
              width: 3.58rem;
              height: 0.38rem;
              border: 0.01rem solid #b6b6b6;
              border-radius: 0.03rem;
            }
            el-date-editor--daterange.el-input,
            .el-date-editor--daterange.el-input__inner,
            .el-date-editor--timerange.el-input,
            .el-date-editor--timerange.el-input__inner {
              width: 3.58rem;
            }
            &:nth-child(6) {
              input {
                border: none;
                  width: 1.5rem;
              }
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
