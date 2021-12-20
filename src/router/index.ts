import React from 'react'

const routes = [
  {
    path: '/',
    name: 'Index',
    number: 1,
    component: React.lazy(() => import('../views/Home')),
  },
  {
    path: '/about',
    name: 'About',
    number: 2,
    component: React.lazy(() => import('@/views/About')),
  },
  {
    path: '*',
    name: 'NotFound',
    number: 404,
    component: React.lazy(() => import('../views/NotFound')),
  },
]

export default routes
