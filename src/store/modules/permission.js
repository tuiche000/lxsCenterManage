import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // if (route.meta && route.meta.roles) {
  if (route.id) {
    // console.log(roles)
    return roles.some(role => {
      // return route.path.includes(role)
      return route.id === role.id
    })
  } else {
    return false
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  // let _roles = []
  // function rolesPush(id) {
  //   _roles.push(id)
  // }
  // roles.forEach(item => {
  //   rolesPush(item.id)
  //   if (item.children) {

  //   }
  // })
  // console.log(_roles)

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      // if (tmp.children) {
      //   tmp.children = filterAsyncRoutes(tmp.children, roles)
      // }
      res.push(tmp)
    }
  })
  console.log(res)
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // console.log(roles)
      // console.log(asyncRoutes)
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
