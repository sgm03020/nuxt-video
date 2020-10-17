export const state = () => ({
  hoge: 'hoge',
})

export const getters = {
  hoge: (state) => {
    return state.hoge
  },
}
