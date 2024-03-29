import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'


Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  getters: {
    cartlength(state) {
      return state.cartList.length
    },
    cartlist(state) {
      return state.cartList
    }
  }
})

export default store
