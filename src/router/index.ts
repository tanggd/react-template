import React from "react"

const routes = [
  {
    path: '/',
    name: 'Index',
    // component: Index,
    component: React.lazy(() => import("../views/Home"))
  },
  {
    path: '/about',
    name: 'About',
    // component: About,
    component: React.lazy(() => import("@/views/About"))
  },
  {
    path: '*',
    name: 'NotFound',
    // component: NotFound,
    component: React.lazy(() => import("../views/NotFound"))
  }
]

export default routes