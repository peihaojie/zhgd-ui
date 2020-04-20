/*
 * @Date         : 2020-01-30 14:48:38
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-19 22:27:16
 * @FilePath     : \src\main.js
 */
/* jshint esversion: 6 */
import Vue from 'vue';
import axios from './utils/axios';
import OLDURL from './utils/oldUrl';
import VueAMap from 'vue-amap';
import App from './App.vue';
import router from './router';
import './common/font/font.css';
// import './common/icon/iconfont';
import store from './utils/vuex';
import CONSOLE from './utils/console';
// CDN导入所以注释掉了;
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
import md5 from 'js-md5';
// 用于判断是否是打安装包;
import installation from './installation.js';
Vue.directive('focus', function (el) {
  el.querySelector('input').focus();
});
Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
Vue.prototype.$old = OLDURL;
Vue.prototype.$exe = installation;
Vue.prototype.$log = CONSOLE.log;
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.config.productionTip = false;
VueAMap.initAMapApiLoader({
  key: '843c96184d7b9224cd7818219208e777',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});
new Vue({
  render: h => h(App),
  store: store,
  router
}).$mount('#app');