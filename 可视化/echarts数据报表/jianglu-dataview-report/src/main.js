import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Echarts from 'echarts'
import VueEcharts from 'vue-echarts'
import './style/index.css'

vue.component('v-chart', VueEcharts)

Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
