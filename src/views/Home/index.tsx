import { useState } from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import logo from '@/assets/images/logo.svg'

export default function Home() {
  const [count, setCount] = useState(0)
  // 

  return <div>
    <h1>Home</h1>
    <img src={logo} className="App-logo" alt="logo" style={{width:'200px', height:'200px'}} />
    <Button type="primary" icon={<SearchOutlined />} onClick={() => { setCount(count + 1) }}>count is {count}</Button>
  </div>
}