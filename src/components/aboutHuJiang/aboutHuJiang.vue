<!--
 * @Date         : 2020-04-10 16:34:49
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-10 19:39:35
 * @FilePath     : \src\components\aboutHuJiang\aboutHuJiang.vue
 -->
<template>
  <div class="bg">
    <div class="header"></div>
    <div class="bodys">
      <div class="about-us">
        <div class="title">
          <span>关于我们</span>
          <span>ABOUT US</span>
        </div>
        <div class="text">
          <p>一虎科技集团，是专注于建筑领域物联网与智能化产品<span>研发、生产、销售、服务</span>为一体的科技集团公司。公司整合<span>物联网、云计算、大数据、人脸识别、AI智能监控、RFID、NFC、GPS、智能传感器等</span>技术，致力于为建筑领域中实名制管理、产业工人管理、智能监控、绿色施工、项目安全/质量/进度/材料管理、智慧宿舍、无人机、VR培训、远程对讲等最专业的综合方案服务商。</p>
          <p>公司总部设在深圳，下属虎匠科技在深圳负责南方业务，河北一虎电子在石家庄负责北方业务。公司在福建、上海、海南、广西等设有办事处。</p>
          <p>公司具有在建筑科技领域专利<span>14项</span>，软著<span>57项</span>，服务项目<span>1000+个</span>。</p>
          <p>公司与中国建协、中国建筑、中国铁建、天健集团、水务集团、华润建设、中车信息、河北清华研究院等<span>100多家</span>企事业单位建立了稳定的合作关系。</p>
        </div>
        <div class="img" />
      </div>
      <div class="development-history">
        <div class="title">
          <span>发展历程</span>
          <span>DEVELOPMENT HISTORY</span>
        </div>
        <div class="year">
          <ul class="fifteen">
            <span>2015</span>
            <li>工地考勤门禁系统</li>
            <li>腾讯滨海大厦项目试点成功</li>
          </ul>
          <ul class="sixteen">
            <span>2016</span>
            <li>“两制”管理平台上线</li>
            <li>车牌识别系统上线</li>
            <li>成为汉王广东代理</li>
          </ul>
          <ul class="seventeen">
            <span>2017</span>
            <li>成为政府“两制”服务推荐供应商</li>
            <li>工地一卡通系统上线</li>
            <li>获得专利软著等20余项</li>
            <li>服务项目达到100个</li>
          </ul>
          <ul class="eighteen">
            <span>2018</span>
            <li>中标“云筑网”十大合格供应商之一</li>
            <li>获得“高新、双软”企业认证</li>
            <li>与中建、中铁、中交建等20余家建筑单位达成合作关系</li>
            <li>成立海南、广西、福建、上海等100+个服务网点</li>
            <li>服务项目达到500个</li>
          </ul>
          <ul class="nineteen">
            <span>2019</span>
            <li>智慧工地系统上线</li>
            <li>中标华润南、北方公司供应商</li>
            <li>与中车信息形成合作关系</li>
            <li>预计实现全国200+主要城市覆盖</li>
            <li>服务项目1000+</li>
            <li>产业工人系统上线</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
@blue: #0063ff;
@li-Text: #595656;
@li-span: #2d5a93;
.bg {
  background-color: #fff;
}
.header {
  height: 4rem;
  background: url("~images/about_hujiang_bg.png");
  background-size: 100% 100%;
}
.bodys {
  padding: 0 3.6rem;
  .title {
    font-size: .3rem;
    line-height: .36rem;
    font-weight: 600;
    margin-bottom: .2rem;
    span:nth-child(1) {
      color: @blue;
      position: relative;
      &:before {
        display: block;
        content: '';
        position: absolute;
        bottom: -.1rem;
        left: 0;
        width: .6rem;
        height: .05rem;
        background-color: @blue;
      }
    }
    span:nth-child(2) {
      color: #999;
      margin-left: .2rem;
    }
  }
  .about-us {
    padding: .6rem 0;
    .text {
      width: 5.7rem;
      display: inline-block;
      p {
        font-size: .18rem;
        line-height: .36rem;
        text-align: justify;
      }
      span {
        color: #ff4d4d;
      }
    }
    .img {
      vertical-align: top;
      float: right;
      width: 6rem;
      height: 4rem;
      background: url("~images/about_hujiang_us.png");
      background-size: 100% 100%;
    }
  }
  .development-history {
    .year {
      height: 5.5rem;
      background: url("~images/about_hujiang_airplane.png");
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      ul {
        span {
          margin-left: -.2rem;
          color: @li-span;
          font-size: .24rem;
          font-weight: 500;
        }
        li {
          list-style-image: url("~images/about_hujiang_diandian.png") !important;
          color: @li-Text;
          font-size: .18rem;
          line-height: .3rem;
        }
      }
    }
  }
}
</style>
