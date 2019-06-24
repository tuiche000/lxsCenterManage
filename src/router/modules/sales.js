import Layout from '@/layout'

const salesRouter = {
  path: '/sales',
  component: Layout,
  redirect: '/sales/sales/pro',
  name: 'Sales',
  id: 3,
  meta: {
    title: '销售系统'
  },
  children: [
    {
      path: 'sales',
      component: () => import('@/views/sales/sales/index'), // Parent router-view
      name: 'Sales-sales',
      id: 301,
      meta: { title: '销售系统' },
      redirect: '/sales/sales/pro',
      alwaysShow: true,
      children: [
        {
          path: 'pro',
          component: () => import('@/views/sales/sales/pro'),
          name: 'Sales-sales-pro',
          id: 30101,
          meta: { title: '产品查询' }
        }
      ]
    },
    {
      path: 'disGroup',
      component: () => import('@/views/sales/disGroup/index'), // Parent router-view
      name: 'disGroup-disGroup',
      id: 306,
      meta: { title: '分销组管理' },
      redirect: '/sales/disGroup/pro',
      alwaysShow: true,
      children: [
        {
          path: 'pro',
          component: () => import('@/views/sales/disGroup/pro'),
          name: 'Sales-disGroup-pro',
          id: 30601,
          meta: { title: '分销组设置' }
        }
      ]
    }
  ]
}

export default salesRouter
