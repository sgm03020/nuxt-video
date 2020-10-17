/*
export const state = () => ({
  isHideBar: false,
  hi: 'Hi!',
  pages: [],
})

// https://typescript.nuxtjs.org/cookbook/store.html#vanilla
export const gtters = {
  hi(state) {
    return state.hi
  },
  isHideBar: state => {
    return state.isHideBar
  },
  pages: state => {
    return state.pages
  }
}

export const mutations = {
  setHideBar(state, flg) {
    state.isHideBar = flg
  },
  setPages(state, pages) {
    state.pages = pages
  },
}

*/

/* クラシックモード
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    },
    getters: {
      counter: (state) => {
        return state.counter
      }
    }
  })
}

export default createStore
*/

// export const state = () => ({
//   counter: 0,
//   hoge: 'hoge',
// })

export const state = () => ({
  isHideBar: false,
  pages: [],
})

export const mutations = {
  setHideBar(state, flg) {
    state.isHideBar = flg
  },
  setPages(state, pages) {
    state.pages = pages
  },
}
