export const state = () => ({
  isHideBar: false,
})

export const mutations = {
  setHideBar(state, flg) {
    state.isHideBar = flg
  },
}
