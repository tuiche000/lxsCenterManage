import Layout from '@/layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/my/information',
  name: 'Home',
  meta: {
    title: '首页'
  },
  children: [
    {
      path: 'my',
      component: () => import('@/views/home/my/index'), // Parent router-view
      name: 'Home-my',
      meta: { title: '个人中心' },
      redirect: '/home/my/information',
      alwaysShow: true,
      children: [
        {
          path: 'information',
          component: () => import('@/views/home/my/myInformation'),
          name: 'Home-my-information',
          meta: { title: '我的信息' }
        }
      ]
    },
    {
      path: 'infManage',
      name: 'Home-infManage',
      component: () => import('@/views/home/infManage/index'),
      meta: { title: '信息管理' },
      children: [
        {
          path: 'information',
          component: () => import('@/views/home/infManage/information'),
          name: 'Home-infManage-information',
          meta: { title: '信息' }
        },
        {
          path: 'log',
          component: () => import('@/views/home/infManage/log'),
          name: 'Home-infManage-log',
          meta: { title: '日志' }
        }
      ]
    }
  ]
}

export default homeRouter
