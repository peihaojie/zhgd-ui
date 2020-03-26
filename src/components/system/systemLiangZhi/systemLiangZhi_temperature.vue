<!--
 * @Date         : 2020-02-24 16:47:57
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-26 16:59:07
 * @FilePath     : \src\components\system\systemLiangZhi\systemLiangZhi_temperature.vue
 -->
<template>
  <div>
    <div class="content">
      <div class="header">
        <div class="area">
          姓名：
          <el-input size="mini" v-model="searchName" placeholder="请输入搜索的姓名" clearable></el-input>
        </div>
        <div class="state date">
          日期：
          <!-- <el-input size="mini" v-model="search" placeholder="请输入搜索的区域" clearable></el-input> -->
          <el-date-picker
            v-model="search"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="mini"
          ></el-date-picker>
        </div>
        <div class="state">
          状态：
          <el-select v-model="searchState" placeholder="请选择状态" size="mini" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search_btn" @click="searchData(null)">搜 索</div>
      </div>
      <div class="body">
        <div class="btn">
          <div class="click" @click="changeTemperature">
            <i class="particularly-area"></i>
            {{clickTemperature ? "发热筛选" : "正常数据"}}
          </div>
          <!-- <div
            class="click"
            v-if="updateType === 2 || updateType === 0"
            @click="updateQuarantine(1)"
          >
            <i class="observation-shield"></i>
            隔离观察
          </div>
          <div class="no-click" v-else>
            <i class="no-observation-shield"></i>
            隔离观察
          </div>
          <div
            class="click"
            v-if="updateType === 2 || updateType === 1"
            @click="updateQuarantine(0)"
          >
            <i class="work"></i>
            恢复工作
          </div>
          <div class="no-click" v-else>
            <i class="no-work"></i>
            恢复工作
          </div> -->
        </div>
        <div class="table-wrap">
          <el-table
            ref="table"
            :data="tableData"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            style="width: 100%"
            stripe
            border
            :header-cell-style="backHeaderCell"
            :cell-style="backCell"
            @selection-change="selectData"
            @row-click="rowClick"
          >
            <el-table-column type="selection" width="55" :selectable="selectable" align="center"></el-table-column>
            <el-table-column label="序号" width="55" type="index" :index="getIndex" align="center"></el-table-column>
            <el-table-column prop="empName" label="姓名" width="100" sortable></el-table-column>
            <el-table-column prop="id" label="工号" width="100" sortable></el-table-column>
            <el-table-column prop="constructionName" label="所属参建单位" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="工种" width="120" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="passedTime" label="打卡时间" sortable></el-table-column>
            <el-table-column label="进出标识" width="120" align="center" sortable>
              <template slot-scope="scope">{{scope.row.direction=='in' ? '进入' : '离开'}}</template>
            </el-table-column>
            <el-table-column label="体温" width="100" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                <p
                  style="color: #ffd14f"
                  v-if="scope.row.temperature > setedTemperature && setedTemperature"
                >{{scope.row.temperature}}</p>
                <p v-else>{{scope.row.temperature}}</p>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" sortable align="center">
              <template slot-scope="scope">
                <p style="color: #ffd14f" v-if="scope.row.quarantine==1">隔离观察</p>
                <p v-else>正常工作</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <div
            class="total"
          >显示 {{total > 1 ? footerNum + 1 : 0}} 到 {{total > 15 ? footerNum + 15 : total}} ，共 {{total}} 条记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      searchState: "", // 搜索的状态
      options: [
        {
          value: 1,
          label: "隔离观察"
        },
        {
          value: 0,
          label: "体温正常"
        }
      ], // 下拉框的选项
      tableData: [], // 表格数据
      search: "", // 搜索时间
      checkedSearch: "", // 点搜索时间
      searchName: "", // 搜索姓名
      checkedName: "", // 点搜索时姓名
      idList: {}, // 选中的ID列表
      updateType: 2, // 上传类型（0是正常， 1是隔离）
      pageTurn: false, // 是否是翻页状态
      setedTemperature: "", // 设置的体温
      clickTemperature: true // 切换体温切换状态
    };
  },
  computed: {
    footerNum: function() {
      return (this.currentPage - 1) * 15;
    }
  },
  mounted() {
    this.getTemperature();
    const date = new Date();
    const firstDay = `${date.getFullYear()}-01-01`;
    const now = `${date.getFullYear()}-${(date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}`;
    this.search = this.checkedSearch = [firstDay, now];
    this.getTableData(this.checkedSearch);
  },
  methods: {
    // 获取设置的体温
    getTemperature() {
      this.$axios
        .post(`/api/temperature/temperatureList?pid=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0 && res.data.data.length) {
            this.setedTemperature = Number(res.data.data[0].temperature);
          }
        });
    },

    // 翻页
    handleCurrentChange(val) {
      this.pageTurn = true;
      this.currentPage = val;
      this.search = this.checkedSearch;
      this.searchName = this.checkedName;
      let checked = [];
      this.getTableData(this.checkedSearch, this.searchState, this.checkedName);
      setTimeout(() => {
        let checkedId = this.idList[`${this.currentPage}`];
        if (checkedId) {
          checkedId.forEach(id => {
            this.tableData.forEach(data => {
              if (data.id == id) {
                checked.push(data);
              }
            });
          });
          checked.forEach(row => {
            this.$refs.table.toggleRowSelection(row);
          });
        }
        this.pageTurn = false;
      }, 500);
    },

    // table表头
    backHeaderCell({ columnIndex }) {
      switch (columnIndex) {
        case 3:
        case 4:
          return {
            backgroundColor: "#c5e8ff",
            padding: "0",
            // textAlign: "left",
            fontSize: ".14rem"
          };
        default:
          return {
            backgroundColor: "#c5e8ff",
            padding: "0",
            // textAlign: "center",
            fontSize: ".14rem"
          };
      }
    },

    // table样式
    backCell({ columnIndex }) {
      switch (columnIndex) {
        case 3:
        case 4:
          return {
            padding: "0",
            // textAlign: "left",
            fontSize: ".14rem"
          };
        default:
          return {
            padding: "0",
            // textAlign: "center",
            fontSize: ".14rem"
          };
      }
    },

    // selec勾选的时候触发
    selectData(obj) {
      // 将ID取出保存起来
      if (!this.pageTurn) {
        let temp = [];
        obj.forEach(a => temp.push(a.id));
        this.idList[`${this.currentPage}`] = temp;
        // 判断选中状态
        let keys = Object.keys(this.idList);
        if (keys.every(a => this.idList[a].length == 0)) {
          this.updateType = 2;
        } else {
          let id = this.idList[`${this.currentPage}`][0];
          let quarantine = id
            ? this.tableData.filter(a => a.id == id)[0].quarantine
            : this.updateType;
          this.updateType = Number(quarantine);
        }
      }
    },

    // 修改人员状态
    updateQuarantine(tag) {
      let ids = "";
      let keys = Object.keys(this.idList);
      if (keys.length && keys.every(a => this.idList[a].length != 0)) {
        keys.forEach(key => {
          ids = ids + this.idList[key].join(",") + ",";
        });
        ids = ids.substr(0, ids.length - 1);
        this.loading = true;
        this.$axios
          .post(
            `/api/pc/projectWorkersApi/updateQuarantine?tag=${tag}&ids=${ids}`
          )
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: `${
                  this.updateType == 1
                    ? "恢复"
                    : this.updateType == 0
                    ? "隔离"
                    : ""
                }成功！`
              });
              this.searchData();
            } else {
              this.$message({
                type: "warning",
                message: `${
                  this.updateType == 1
                    ? "恢复"
                    : this.updateType == 0
                    ? "隔离"
                    : ""
                }失败！`
              });
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "请选择人员!"
        });
      }
    },

    // 搜索
    searchData(temperature) {
      this.checkedSearch = this.search;
      this.checkedName = this.searchName;
      this.currentPage = 1;
      this.updateType = 2;
      this.idList = {};
      this.getTableData(
        this.checkedSearch,
        this.searchState,
        this.checkedName,
        !this.clickTemperature ? temperature : ""
      );
    },

    // 获取表格数据
    getTableData(
      search = [],
      quarantine = "",
      checkedName = "",
      temperature = ""
    ) {
      this.loading = true;
      this.$axios
        .post(
          `/api/personnelTemperature/personnelTemperatureList?projectId=${
            this.projectId
          }&pageNum=${this.currentPage}&pageSize=${
            this.pageSize
          }&quarantine=${quarantine}&empName=${checkedName}&startDate=${
            search.length ? search[0] : ""
          }&endDate=${
            search.length ? search[1] : ""
          }&temperature=${temperature}`
        )
        .then(res => {
          this.loading = false;
          if (res.data.code == 0) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.rows;
            document.getElementsByClassName(
              "el-checkbox__inner"
            )[0].style.display = "none";
            if (
              (!this.tableData && search) ||
              (!this.tableData && quarantine) ||
              (!this.tableData && checkedName)
            ) {
              this.messageBox("抱歉没有数据！", 0);
            }
            if (quarantine === 0 || quarantine === 1) {
              document.getElementsByClassName(
                "el-checkbox__inner"
              )[0].style.display = "inline-block";
            }
          }
        });
    },

    // 表格点击行触发选中当前行
    rowClick(row) {
      let table = this.$refs.table;
      if (this.updateType == 2 || this.updateType == row.quarantine) {
        table.toggleRowSelection(row);
      } else {
        return;
      }
    },

    // 表格是否可选
    selectable(row) {
      let type =
        this.updateType === 0 ? 1 : this.updateType === 1 ? 0 : this.updateType;
      switch (Number(row.quarantine)) {
        case type:
          return false;
        default:
          return true;
      }
    },

    // 切换搜索状态
    changeTemperature() {
      if (this.setedTemperature) {
        this.clickTemperature = !this.clickTemperature
        this.searchData(this.setedTemperature)
      } else {
        this.messageBox("未设置体温预警！", 0);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  height: 9.5rem;
  border-radius: 0.04rem;
  background-color: #fff;
  -webkit-box-shadow: 0 0 0.5rem -0.3rem #666;
  box-shadow: 0 0 0.5rem -0.3rem #666;
  .header {
    height: 0.8rem;
    padding: 0 0.3rem;
    border-bottom: 0.1rem solid #f7f7f7;
    font-size: 0.18rem;
    line-height: 0.4rem;
    display: flex;
    align-items: center;
    position: relative;
    > div {
      white-space: nowrap;
    }
    /deep/.el-input__inner {
      width: 2rem;
      display: inline-block;
      border: 0.01rem solid #b6b6b6;
      border-radius: 0.05rem;
    }
    .el-input--mini {
      width: 2rem;
    }
    .state {
      margin-left: 0.2rem;
    }
    .date {
      /deep/.el-input__inner {
        width: 3.5rem;
        display: inline-flex;
      }
      /deep/.el-date-editor .el-range-separator {
        padding: 0;
      }
    }
    .search_btn {
      position: absolute;
      right: 0.3rem;
      width: 1.6rem;
      background-color: #ffd14f;
      border-radius: 0.05rem;
      border: 0.01rem solid #d4ad40;
      color: #fff;
      text-align: center;
      cursor: pointer;
      transition: 0.5s all;
      transition-timing-function: ease-in-out;
      &:hover {
        background-color: #ffc727;
        box-shadow: 1px 1px 3px 1px #c0c4cc;
      }
    }
  }
  .body {
    padding: 0.2rem;
    height: calc(100% - 0.8rem);
    position: relative;
    .btn {
      padding-bottom: 0.1rem;
      .click {
        display: inline-block;
        color: #0090ff;
        line-height: 0.28rem;
        border-radius: 0.05rem;
        border: 0.01rem solid #0090ff;
        font-size: 0.14rem;
        width: 1rem;
        text-align: center;
        cursor: pointer;
        margin-right: 0.15rem;
        background-color: #fff;
        transition: all 0.5s;
        transition-timing-function: ease-in-out;
        &:hover {
          background-color: #0090ff;
          color: #fff;
          box-shadow: 1px 1px 3px 1px #c0c4cc;
          .particularly-area {
            background-image: url("../../../../static/images/particularly-area-hover.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          .observation-shield {
            background-image: url("../../../../static/images/observation-shield-hover.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          .work {
            background-image: url("../../../../static/images/back-work-hover.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }
        i {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          vertical-align: sub;
        }
        .particularly-area {
          background-image: url("../../../../static/images/particularly-area.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .observation-shield {
          background-image: url("../../../../static/images/observation-shield.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .work {
          background-image: url("../../../../static/images/back-work.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .no-click {
        display: inline-block;
        color: #dbdbdb;
        line-height: 0.28rem;
        border-radius: 0.05rem;
        border: 0.01rem solid #dbdbdb;
        font-size: 0.14rem;
        width: 1rem;
        text-align: center;
        cursor: pointer;
        margin-right: 0.15rem;
        background-color: #fff;
        transition: background-color 0.5s, color 0.5s;
        transition-timing-function: ease-in-out;
        i {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          vertical-align: sub;
        }
        .particularly-area {
          background-image: url("../../../../static/images/particularly-area.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .no-observation-shield {
          background-image: url("../../../../static/images/no-observation-shield.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .no-work {
          background-image: url("../../../../static/images/no-back-work.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .table-wrap {
      /deep/.el-table .cell {
        line-height: 0.45rem;
      }
      /deep/tr td:nth-child(1),
      /deep/tr th:nth-child(1) {
        .cell {
          padding-left: 0;
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0.2rem;
      width: calc(100% - 0.4rem);
      text-align-last: center;
      .total {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0.14rem;
        line-height: 0.32rem;
      }
    }
  }
}
</style>
