//2018/1/9 by DKZ
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import worksys from './worksys'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        worksys
    },
    state: {
        is_mainnav_collapse:false,
    },
    mutations:mutations
})
export default store