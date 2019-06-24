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
      meta: { title: '销售系统' },
      redirect: '/sales/sales/pro',
      alwaysShow: true,
      children: [
        {
          path: 'pro',
          component: () => import('@/views/sales/sales/pro'),
          name: 'Sales-sales-pro',
          meta: { title: '产品查询' }
        }
      ]
    }
  ]
}

export default salesRouter
