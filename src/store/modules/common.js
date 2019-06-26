const state = {
  id: ''
}

const mutations = {
  SETID: (state, id) => {
    console.log(id)
    state.id = id
  }
}

const actions = {
  setId({ commit }, id) {
    commit('SETID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
