import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setId, getId,removeId } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    menu: [],
    sessionKey: sessionStorage.getItem('sessionKey')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SESSIONKEY: (state, sessionKey) => {
      state.sessionKey = sessionKey
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.data) {
            const { token, sessionKey } = response.data
            setToken(token)
            // setId('sessionKey', sessionKey)
            sessionStorage.setItem('sessionKey',sessionKey);
            commit('SET_TOKEN', token)
            commit('SET_SESSIONKEY', sessionKey)
          }
          // setToken(response.data)
          // commit('SET_USERINFO', response.data)
          // commit('SET_TOKEN', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_SESSIONKEY', '')
        // commit('SET_USERINFO', {})
        removeToken()        
        removeId('sessionKey')
        sessionStorage.removeItem('sessionKey');
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_USERINFO', {})
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
