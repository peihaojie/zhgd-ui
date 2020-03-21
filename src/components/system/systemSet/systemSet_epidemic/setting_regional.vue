<!--
 * @Date         : 2020-02-28 16:37:57
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-03-21 20:37:02
 * @FilePath     : \src\components\system\systemSet\systemSet_epidemic\setting_regional.vue
 -->
<template>
  <div>
    <div class="center">
      <div class="title">
        <i class="el-icon-arrow-left" @click="back"></i>
        区域设置
      </div>
      <div class="tabs">
        <div class="tab active">区域设置</div>
      </div>
      <div class="button">
        <span class="btn" @click="add">
          <i class="el-icon-circle-plus-outline"></i>
          添加敏感区域
        </span>
      </div>
      <div class="list">
        <template v-if="list.length">
          <div class="item" v-for="item in list" :key="item.id">
            设定区域：{{item.area}}
            <div class="switch">
              <span v-if="item.enter">禁止入内</span>
              <el-switch
                v-model="item.enter"
                active-color="#ff4949"
                inactive-color="#0090ff"
                @change="forbid(item.id)"
              ></el-switch>
              <span class="del" @click="deleteAge(item.id)">删除</span>
            </div>
          </div>
        </template>
      </div>
      <dialogs
        :show.sync="show"
        :title="title"
        width="6rem"
        class="dialog"
        @clear="clear"
        @confirm="confirm"
      >
        设定区域：
        <el-cascader
          v-model="addArea"
          :options="options"
          :props="{ multiple: true, checkStrictly: true }"
        ></el-cascader>
      </dialogs>
    </div>
  </div>
</template>

<script>
import dialogs from "@/base/setting_dialog";
import mixin from "@/utils/mixin";
// 是否只能是唯一值
const only = false;
export default {
  mixins: [mixin],
  data() {
    return {
      options: [],
      show: false, // 弹窗
      title: "添加敏感区域",
      list: [],
      active: "setting",
      projectId: sessionStorage.getItem("pid"),
      addArea: []
    };
  },
  components: {
    dialogs
  },
  mounted() {
    this.getProvince();
    this.getAgeList();
  },
  methods: {
    getProvince() {
      this.$axios
        .post(`192.168.1.39:8080/api/area/selectAllProvinceAndCity?pid=4`)
        .then(res => {
          if (res.data.code == 0) {
            let list = res.data.data.map(a => {
              return {
                id: a.id,
                label: a.title,
                value: a.id,
                type: a.type,
                parentId: a.parentId,
                isid: a.isid
              };
            });
            this.options = list
              .filter(a => a.type === "PROVINCE")
              .forEach(a => {
                list.forEach(b => {
                  if (
                    b.parentId == a.id &&
                    b.id != 1001 &&
                    b.id != 1002 &&
                    b.id != 1073 &&
                    b.id != 1234 &&
                    b.id != 1343 &&
                    b.id != 1344 &&
                    b.id != 1345
                  ) {
                    a.children = a.children ? a.children : new Array();
                    a.children.push(b);
                  }
                });
              });
          }
        });
      let list = [
        {
          id: 1,
          title: "北京市",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 2,
          title: "天津市",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 3,
          title: "河北省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 4,
          title: "山西省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 5,
          title: "内蒙古省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 6,
          title: "辽宁省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 7,
          title: "吉林省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 8,
          title: "黑龙江省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 9,
          title: "上海市",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 10,
          title: "江苏省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 11,
          title: "浙江省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 12,
          title: "安徽省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 13,
          title: "福建省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 14,
          title: "江西省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 15,
          title: "山东省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 16,
          title: "河南省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 17,
          title: "湖北省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 18,
          title: "湖南省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 19,
          title: "广东省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 20,
          title: "广西省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 21,
          title: "海南省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 22,
          title: "重庆市",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 23,
          title: "四川省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 24,
          title: "贵州省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 25,
          title: "云南省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 26,
          title: "西藏省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 27,
          title: "陕西省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 28,
          title: "甘肃省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 29,
          title: "青海省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 30,
          title: "宁夏省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 31,
          title: "新疆省",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 32,
          title: "香港",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 33,
          title: "澳门",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 34,
          title: "台湾",
          type: "PROVINCE",
          parentId: 0,
          isid: null
        },
        {
          id: 1001,
          title: "北京市",
          type: "CITY",
          parentId: 1,
          isid: null
        },
        {
          id: 1002,
          title: "天津市",
          type: "CITY",
          parentId: 2,
          isid: null
        },
        {
          id: 1003,
          title: "石家庄市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1004,
          title: "唐山市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1005,
          title: "秦皇岛市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1006,
          title: "邯郸市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1007,
          title: "邢台市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1008,
          title: "保定市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1009,
          title: "张家口市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1010,
          title: "承德市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1011,
          title: "沧州市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1012,
          title: "廊坊市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1013,
          title: "衡水市",
          type: "CITY",
          parentId: 3,
          isid: null
        },
        {
          id: 1014,
          title: "太原市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1015,
          title: "大同市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1016,
          title: "阳泉市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1017,
          title: "长治市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1018,
          title: "晋城市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1019,
          title: "朔州市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1020,
          title: "晋中市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1021,
          title: "运城市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1022,
          title: "忻州市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1023,
          title: "临汾市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1024,
          title: "吕梁市",
          type: "CITY",
          parentId: 4,
          isid: null
        },
        {
          id: 1025,
          title: "呼和浩特市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1026,
          title: "包头市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1027,
          title: "乌海市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1028,
          title: "赤峰市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1029,
          title: "通辽市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1030,
          title: "鄂尔多斯市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1031,
          title: "呼伦贝尔市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1032,
          title: "巴彦淖尔市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1033,
          title: "乌兰察布市",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1034,
          title: "兴安盟",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1035,
          title: "锡林郭勒盟",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1036,
          title: "阿拉善盟",
          type: "CITY",
          parentId: 5,
          isid: null
        },
        {
          id: 1037,
          title: "沈阳市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1038,
          title: "大连市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1039,
          title: "鞍山市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1040,
          title: "抚顺市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1041,
          title: "本溪市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1042,
          title: "丹东市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1043,
          title: "锦州市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1044,
          title: "营口市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1045,
          title: "阜新市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1046,
          title: "辽阳市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1047,
          title: "盘锦市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1048,
          title: "铁岭市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1049,
          title: "朝阳市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1050,
          title: "葫芦岛市",
          type: "CITY",
          parentId: 6,
          isid: null
        },
        {
          id: 1051,
          title: "长春市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1052,
          title: "吉林市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1053,
          title: "四平市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1054,
          title: "辽源市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1055,
          title: "通化市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1056,
          title: "白山市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1057,
          title: "松原市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1058,
          title: "白城市",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1059,
          title: "延边朝鲜族自治州",
          type: "CITY",
          parentId: 7,
          isid: null
        },
        {
          id: 1060,
          title: "哈尔滨市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1061,
          title: "齐齐哈尔市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1062,
          title: "鸡西市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1063,
          title: "鹤岗市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1064,
          title: "双鸭山市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1065,
          title: "大庆市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1066,
          title: "伊春市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1067,
          title: "佳木斯市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1068,
          title: "七台河市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1069,
          title: "牡丹江市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1070,
          title: "黑河市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1071,
          title: "绥化市",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1072,
          title: "大兴安岭地区",
          type: "CITY",
          parentId: 8,
          isid: null
        },
        {
          id: 1073,
          title: "上海市",
          type: "CITY",
          parentId: 9,
          isid: null
        },
        {
          id: 1074,
          title: "南京市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1075,
          title: "无锡市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1076,
          title: "徐州市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1077,
          title: "常州市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1078,
          title: "苏州市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1079,
          title: "南通市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1080,
          title: "连云港市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1081,
          title: "淮安市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1082,
          title: "盐城市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1083,
          title: "扬州市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1084,
          title: "镇江市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1085,
          title: "泰州市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1086,
          title: "宿迁市",
          type: "CITY",
          parentId: 10,
          isid: null
        },
        {
          id: 1087,
          title: "杭州市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1088,
          title: "宁波市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1089,
          title: "温州市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1090,
          title: "嘉兴市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1091,
          title: "湖州市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1092,
          title: "绍兴市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1093,
          title: "金华市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1094,
          title: "衢州市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1095,
          title: "舟山市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1096,
          title: "台州市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1097,
          title: "丽水市",
          type: "CITY",
          parentId: 11,
          isid: null
        },
        {
          id: 1098,
          title: "合肥市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1099,
          title: "芜湖市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1100,
          title: "蚌埠市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1101,
          title: "淮南市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1102,
          title: "马鞍山市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1103,
          title: "淮北市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1104,
          title: "铜陵市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1105,
          title: "安庆市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1106,
          title: "黄山市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1107,
          title: "滁州市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1108,
          title: "阜阳市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1109,
          title: "宿州市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1110,
          title: "巢湖市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1111,
          title: "六安市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1112,
          title: "亳州市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1113,
          title: "池州市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1114,
          title: "宣城市",
          type: "CITY",
          parentId: 12,
          isid: null
        },
        {
          id: 1115,
          title: "福州市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1116,
          title: "厦门市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1117,
          title: "莆田市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1118,
          title: "三明市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1119,
          title: "泉州市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1120,
          title: "漳州市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1121,
          title: "南平市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1122,
          title: "龙岩市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1123,
          title: "宁德市",
          type: "CITY",
          parentId: 13,
          isid: null
        },
        {
          id: 1124,
          title: "南昌市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1125,
          title: "景德镇市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1126,
          title: "萍乡市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1127,
          title: "九江市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1128,
          title: "新余市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1129,
          title: "鹰潭市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1130,
          title: "赣州市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1131,
          title: "吉安市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1132,
          title: "宜春市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1133,
          title: "抚州市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1134,
          title: "上饶市",
          type: "CITY",
          parentId: 14,
          isid: null
        },
        {
          id: 1135,
          title: "济南市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1136,
          title: "青岛市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1137,
          title: "淄博市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1138,
          title: "枣庄市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1139,
          title: "东营市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1140,
          title: "烟台市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1141,
          title: "潍坊市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1142,
          title: "济宁市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1143,
          title: "泰安市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1144,
          title: "威海市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1145,
          title: "日照市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1146,
          title: "莱芜市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1147,
          title: "临沂市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1148,
          title: "德州市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1149,
          title: "聊城市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1150,
          title: "滨州市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1151,
          title: "荷泽市",
          type: "CITY",
          parentId: 15,
          isid: null
        },
        {
          id: 1152,
          title: "郑州市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1153,
          title: "开封市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1154,
          title: "洛阳市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1155,
          title: "平顶山市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1156,
          title: "安阳市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1157,
          title: "鹤壁市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1158,
          title: "新乡市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1159,
          title: "焦作市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1160,
          title: "濮阳市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1161,
          title: "许昌市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1162,
          title: "漯河市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1163,
          title: "三门峡市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1164,
          title: "南阳市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1165,
          title: "商丘市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1166,
          title: "信阳市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1167,
          title: "周口市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1168,
          title: "驻马店市",
          type: "CITY",
          parentId: 16,
          isid: null
        },
        {
          id: 1169,
          title: "武汉市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1170,
          title: "黄石市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1171,
          title: "十堰市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1172,
          title: "宜昌市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1173,
          title: "襄樊市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1174,
          title: "鄂州市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1175,
          title: "荆门市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1176,
          title: "孝感市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1177,
          title: "荆州市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1178,
          title: "黄冈市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1179,
          title: "咸宁市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1180,
          title: "随州市",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1181,
          title: "恩施土家族苗族自治州",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1182,
          title: "神农架",
          type: "CITY",
          parentId: 17,
          isid: null
        },
        {
          id: 1183,
          title: "长沙市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1184,
          title: "株洲市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1185,
          title: "湘潭市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1186,
          title: "衡阳市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1187,
          title: "邵阳市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1188,
          title: "岳阳市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1189,
          title: "常德市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1190,
          title: "张家界市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1191,
          title: "益阳市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1192,
          title: "郴州市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1193,
          title: "永州市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1194,
          title: "怀化市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1195,
          title: "娄底市",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1196,
          title: "湘西土家族苗族自治州",
          type: "CITY",
          parentId: 18,
          isid: null
        },
        {
          id: 1197,
          title: "广州市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1198,
          title: "韶关市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1199,
          title: "深圳市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1200,
          title: "珠海市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1201,
          title: "汕头市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1202,
          title: "佛山市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1203,
          title: "江门市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1204,
          title: "湛江市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1205,
          title: "茂名市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1206,
          title: "肇庆市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1207,
          title: "惠州市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1208,
          title: "梅州市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1209,
          title: "汕尾市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1210,
          title: "河源市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1211,
          title: "阳江市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1212,
          title: "清远市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1213,
          title: "东莞市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1214,
          title: "中山市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1215,
          title: "潮州市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1216,
          title: "揭阳市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1217,
          title: "云浮市",
          type: "CITY",
          parentId: 19,
          isid: null
        },
        {
          id: 1218,
          title: "南宁市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1219,
          title: "柳州市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1220,
          title: "桂林市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1221,
          title: "梧州市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1222,
          title: "北海市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1223,
          title: "防城港市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1224,
          title: "钦州市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1225,
          title: "贵港市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1226,
          title: "玉林市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1227,
          title: "百色市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1228,
          title: "贺州市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1229,
          title: "河池市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1230,
          title: "来宾市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1231,
          title: "崇左市",
          type: "CITY",
          parentId: 20,
          isid: null
        },
        {
          id: 1232,
          title: "海口市",
          type: "CITY",
          parentId: 21,
          isid: null
        },
        {
          id: 1233,
          title: "三亚市",
          type: "CITY",
          parentId: 21,
          isid: null
        },
        {
          id: 1234,
          title: "重庆市",
          type: "CITY",
          parentId: 22,
          isid: null
        },
        {
          id: 1235,
          title: "成都市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1236,
          title: "自贡市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1237,
          title: "攀枝花市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1238,
          title: "泸州市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1239,
          title: "德阳市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1240,
          title: "绵阳市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1241,
          title: "广元市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1242,
          title: "遂宁市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1243,
          title: "内江市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1244,
          title: "乐山市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1245,
          title: "南充市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1246,
          title: "眉山市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1247,
          title: "宜宾市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1248,
          title: "广安市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1249,
          title: "达州市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1250,
          title: "雅安市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1251,
          title: "巴中市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1252,
          title: "资阳市",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1253,
          title: "阿坝藏族羌族自治州",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1254,
          title: "甘孜藏族自治州",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1255,
          title: "凉山彝族自治州",
          type: "CITY",
          parentId: 23,
          isid: null
        },
        {
          id: 1256,
          title: "贵阳市",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1257,
          title: "六盘水市",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1258,
          title: "遵义市",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1259,
          title: "安顺市",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1260,
          title: "铜仁地区",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1261,
          title: "黔西南布依族苗族自治州",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1262,
          title: "毕节地区",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1263,
          title: "黔东南苗族侗族自治州",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1264,
          title: "黔南布依族苗族自治州",
          type: "CITY",
          parentId: 24,
          isid: null
        },
        {
          id: 1265,
          title: "昆明市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1266,
          title: "曲靖市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1267,
          title: "玉溪市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1268,
          title: "保山市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1269,
          title: "昭通市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1270,
          title: "丽江市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1271,
          title: "思茅市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1272,
          title: "临沧市",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1273,
          title: "楚雄彝族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1274,
          title: "红河哈尼族彝族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1275,
          title: "文山壮族苗族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1276,
          title: "西双版纳傣族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1277,
          title: "大理白族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1278,
          title: "德宏傣族景颇族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1279,
          title: "怒江傈僳族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1280,
          title: "迪庆藏族自治州",
          type: "CITY",
          parentId: 25,
          isid: null
        },
        {
          id: 1281,
          title: "拉萨市",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1282,
          title: "昌都地区",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1283,
          title: "山南地区",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1284,
          title: "日喀则地区",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1285,
          title: "那曲地区",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1286,
          title: "阿里地区",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1287,
          title: "林芝地区",
          type: "CITY",
          parentId: 26,
          isid: null
        },
        {
          id: 1288,
          title: "西安市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1289,
          title: "铜川市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1290,
          title: "宝鸡市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1291,
          title: "咸阳市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1292,
          title: "渭南市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1293,
          title: "延安市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1294,
          title: "汉中市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1295,
          title: "榆林市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1296,
          title: "安康市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1297,
          title: "商洛市",
          type: "CITY",
          parentId: 27,
          isid: null
        },
        {
          id: 1298,
          title: "兰州市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1299,
          title: "嘉峪关市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1300,
          title: "金昌市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1301,
          title: "白银市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1302,
          title: "天水市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1303,
          title: "武威市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1304,
          title: "张掖市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1305,
          title: "平凉市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1306,
          title: "酒泉市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1307,
          title: "庆阳市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1308,
          title: "定西市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1309,
          title: "陇南市",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1310,
          title: "临夏回族自治州",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1311,
          title: "甘南藏族自治州",
          type: "CITY",
          parentId: 28,
          isid: null
        },
        {
          id: 1312,
          title: "西宁市",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1313,
          title: "海东地区",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1314,
          title: "海北藏族自治州",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1315,
          title: "黄南藏族自治州",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1316,
          title: "海南藏族自治州",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1317,
          title: "果洛藏族自治州",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1318,
          title: "玉树藏族自治州",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1319,
          title: "海西蒙古族藏族自治州",
          type: "CITY",
          parentId: 29,
          isid: null
        },
        {
          id: 1320,
          title: "银川市",
          type: "CITY",
          parentId: 30,
          isid: null
        },
        {
          id: 1321,
          title: "石嘴山市",
          type: "CITY",
          parentId: 30,
          isid: null
        },
        {
          id: 1322,
          title: "吴忠市",
          type: "CITY",
          parentId: 30,
          isid: null
        },
        {
          id: 1323,
          title: "固原市",
          type: "CITY",
          parentId: 30,
          isid: null
        },
        {
          id: 1324,
          title: "中卫市",
          type: "CITY",
          parentId: 30,
          isid: null
        },
        {
          id: 1325,
          title: "乌鲁木齐市",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1326,
          title: "克拉玛依市",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1327,
          title: "吐鲁番地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1328,
          title: "哈密地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1329,
          title: "昌吉回族自治州",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1330,
          title: "博尔塔拉蒙古自治州",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1331,
          title: "巴音郭楞蒙古自治州",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1332,
          title: "阿克苏地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1333,
          title: "克孜勒苏柯尔克孜自治州",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1334,
          title: "喀什地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1335,
          title: "和田地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1336,
          title: "伊犁哈萨克自治州",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1337,
          title: "塔城地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1338,
          title: "阿勒泰地区",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1339,
          title: "石河子市",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1340,
          title: "阿拉尔市",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1341,
          title: "图木舒克市",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1342,
          title: "五家渠市",
          type: "CITY",
          parentId: 31,
          isid: null
        },
        {
          id: 1343,
          title: "香港特别行政区",
          type: "CITY",
          parentId: 32,
          isid: null
        },
        {
          id: 1344,
          title: "澳门特别行政区",
          type: "CITY",
          parentId: 33,
          isid: null
        },
        {
          id: 1345,
          title: "台湾省",
          type: "CITY",
          parentId: 34,
          isid: null
        }
      ];
      list = list.map(a => {
        return {
          id: a.id,
          label: a.title,
          value: a.id,
          type: a.type,
          parentId: a.parentId,
          isid: a.isid
        };
      });
      this.options = list.filter(a => a.type === "PROVINCE");
      this.options.forEach(a => {
        list.forEach(b => {
          if (
            b.parentId == a.id &&
            b.id != 1001 &&
            b.id != 1002 &&
            b.id != 1073 &&
            b.id != 1234 &&
            b.id != 1343 &&
            b.id != 1344 &&
            b.id != 1345
          ) {
            a.children = a.children ? a.children : new Array();
            a.children.push(b);
          }
        });
      });
    },

    getAgeList() {
      this.$axios
        .post(`/api/areaSettingList?pid=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.list = res.data.data.list.map(a => {
              return {
                area: a.area,
                enter: a.enter == 1
              };
            });
          }
        });
    },

    back() {
      this.$router.go(-1);
    },

    add() {
      if ((only && !this.list.length) || !only) {
        this.show = true;
      } else {
        this.messageBox("温度只可添加唯一值！", 0);
      }
    },

    clear() {
      this.addArea = [];
    },

    async confirm() {
      if (this.addArea.length) {
        let ids = "";
        this.addArea.forEach(a => {
          ids = ids + a[a.length - 1] + ",";
        });
        ids = ids.substring(0, ids.length - 1);
        this.$axios
          .post(`/api/addAreaSetting?ids=${ids}&pid=${this.projectId}`)
          .then(res => {
            if (res.data.code == 0 && res.data.data.code == 0) {
              this.messageBox("添加成功", 1);
            } else {
              this.messageBox("修添加失败", 0);
            }
            this.geAgeList();
          });
        this.show = false;
        this.clear();
      } else {
        this.messageBox("区域选择不可为空！", 0);
        console.log("验证失败");
      }
    },

    forbid(id) {
      this.$axios
        .post(`/api/forbidAreaSetting?id=${id}&pid=${this.projectId}`)
        .then(res => {
          if (res.data.code == 0 && res.data.data.code == 0) {
            this.messageBox("修改成功", 1);
          } else {
            this.messageBox("修改失败", 0);
          }
          this.geAgeList();
        });
    },

    deleteAge(id) {
      this.$axios.post(`/api/deleteAreaSetting?id=${id}`).then(res => {
        if (res.data.code == 0 && res.data.data.code == 0) {
          this.messageBox("删除成功", 1);
        } else {
          this.messageBox("删除失败", 0);
        }
        this.geAgeList();
      });
    },

    // 获取城市列表
    getCityList(id = "") {
      this.$axios.post(`/api/AreaSettingAll?id=${id}`).then(res => {
        if (res.data.code == 0) {
          return res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@bc: #c5e8ff;
@text: #0090ff;
.center {
  box-shadow: 0 0 0.5rem -0.3rem #666;
  height: 9.5rem;
  border-radius: 0.04rem;
  padding: 0 0.2rem;
  overflow-y: auto;
  .title {
    text-align: center;
    font-size: 0.24rem;
    line-height: 0.7rem;
    border-bottom: 0.01rem solid @bc;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      font-size: 0.3rem;
      color: @text;
      cursor: pointer;
    }
  }
  .tabs {
    height: 0.61rem;
    padding-top: 0.2rem;
    border-bottom: 0.01rem solid @bc;
    font-size: 0.16rem;
    line-height: 0.4rem;
    .tab {
      color: #000;
      display: inline-block;
      cursor: pointer;
      margin-right: 0.2rem;
    }
    .active {
      color: @text !important;
      border-bottom: 0.01rem solid @text;
    }
  }
  .button {
    height: 0.7rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      border: 1px solid @text;
      color: @text;
      padding: 0 0.1rem;
      border-radius: 0.05rem;
      line-height: 0.3rem;
      font-size: 0.14rem;
      cursor: pointer;
      transition: 0.5s all;
      &:hover {
        background: @text;
        color: #fff;
      }
    }
  }
  .item {
    height: 1rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    border: 1px solid @bc;
    font-size: 0.16rem;
    color: #000;
    margin-bottom: 0.1rem;
    .switch {
      color: @text;
      .el-switch {
        margin-left: 0.1rem;
      }
      .del {
        margin-left: 0.1rem;
      }
    }
  }
  .dialog {
    line-height: 0.4rem;
    font-size: 0.14rem;
  }
}
</style>