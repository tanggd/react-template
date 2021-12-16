import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <div>
    <div>我是layout</div>
    <main>
      <Outlet />
    </main>
  </div>
}