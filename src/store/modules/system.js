const system = {
  state: {
    loginStatus: true
  },
  mutations: {
    CHANGE_LOGIN_STATUS: (state, status) => {
      state.loginStatus = status
    }
  },
  actions: {
    change_login_status: ({ commit }, status) => {
      commit('CHANGE_LOGIN_STATUS', status)
    },
  }
}
export default system
