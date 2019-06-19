import Layout from '@/layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/my/information',
  name: 'Home',
  id: 2,
  meta: {
    title: '首页'
  },
  children: [
    {
      path: 'my',
      component: () => import('@/views/home/my/index'), // Parent router-view
      name: 'Home-my',
      meta: { title: '个人中心' },
      id: 201,
      redirect: '/home/my/information',
      alwaysShow: true,
      children: [
        {
          path: 'information',
          component: () => import('@/views/home/my/information'),
          name: 'Home-my-information',
          id: 20101,
          meta: { title: '我的信息' }
        }
      ]
    },
    {
      path: 'infManage',
      name: 'Home-infManage',
      id: 202,
      component: () => import('@/views/home/infManage/index'),
      meta: { title: '信息管理' },
      children: [
        {
          path: 'information',
          component: () => import('@/views/home/infManage/information'),
          name: 'Home-infManage-information',
          id: 20201,
          meta: { title: '信息' }
        },
        {
          path: 'log',
          component: () => import('@/views/home/infManage/log'),
          name: 'Home-infManage-log',
          id: 20202,
          meta: { title: '日志' }
        }
      ]
    }
  ]
}

export default homeRouter
