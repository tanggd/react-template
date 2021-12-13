import React from 'react'
import { useState } from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default function Home() {
  const [count, setCount] = useState(0)

  return <div>
    <h1>Home</h1>
    <Button type="primary" icon={<SearchOutlined />} onClick={() => { setCount(count + 1) }}>count is {count}</Button>
  </div>
}