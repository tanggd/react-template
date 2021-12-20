import React from "react"
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import routes from './router'
import Layout from './layout/Layout'


export default function App() {

  return (
    <Router>
      <nav>
        {
          routes.map(item => <NavLink style={({ isActive }) => ({ display: "block", color: isActive ? 'red' : '', margin: "10px 0" })} to={item.path} key={item.number}>{item.name}</NavLink>)
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
    </Router>
  )
}
