/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/1',
  name: 'home',
  meta: {
    title: '首页'
    // icon: 'home'
  }
}

export default homeRouter
