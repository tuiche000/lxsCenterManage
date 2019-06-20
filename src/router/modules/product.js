import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/manage/list',
  name: 'Product',
  id: 5,
  meta: {
    title: '产品系统'
  },
  children: [
    {
      path: 'manage',
      component: () => import('@/views/product/manage/index'), // Parent router-view
      name: 'Product-manage',
      meta: { title: '产品管理' },
      id: 510,
      redirect: '/product/manage/list',
      alwaysShow: true,
      children: [
        {
          path: 'list',
          component: () => import('@/views/product/manage/list'),
          name: 'Product-manage-list',
          id: 51001,
          meta: { title: '产品列表' }
        },
        {
          path: 'log',
          component: () => import('@/views/product/manage/log'),
          name: 'Product-manage-log',
          id: 51009,
          meta: { title: '操作日志' }
        }
      ]
    }
  ]
}

export default productRouter
