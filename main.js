import Vue from 'vue'
import App from './src/App'

import store from './src/store'

<<<<<<< HEAD

=======
>>>>>>> 431ea731e4effdf94b192f780614fdb7249fa46b
Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()