import Vue from 'vue'
import App from './src/App'

import store from './src/store'


Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App,
	beforeCreate() {
		Vue.prototype.$bus = this;//安装全局事件总线
	}
})
app.$mount()