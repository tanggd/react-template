import React from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import routes from './router'
import Layout from './layout/Layout'


export default function App() {

  return (
    <BrowserRouter>
      <nav>
        {
          routes.map(item => <div key={item.path}><Link to={item.path}>{item.name}</Link> | </div>)
        }
      </nav>
      <Routes>
        <Route path="/" element={<Layout />}>
          {
            routes.map(item => <Route key={item.path} path={item.path}
              element={
                <React.Suspense fallback={<>页面加载中...</>}>
                  <item.component />
                </React.Suspense>
              }
            />)
          }
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
