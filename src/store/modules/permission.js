import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 判断是否有权限的路由，返回true为有则显示在侧边栏，false则不显示
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // if (route.meta && route.meta.roles) {
  if (route.id) {
    // console.log(roles)
    return roles.some(role => {
      // return route.path.includes(role)
      return route.id === role
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
  var _roles = []

  for (let i = 0; i < roles.length; i++) {
    next(roles[i])
  }
  function next(val) {
    if (val instanceof Array) {
      val.forEach(item => {
        next(item)
      })
    } else {
      _roles.push(val.id)
    }
    if (val.moduleGroups) {
      next(val.moduleGroups)
    }
    if (val.modules) {
      next(val.modules)
    }
  }

  function filterAsymcRoute(routes, _roles) {
    const res = []

    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(_roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsymcRoute(tmp.children, _roles)
        }
        res.push(tmp)
      }
    })
    return res
  }

  return filterAsymcRoute(routes, _roles)
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
