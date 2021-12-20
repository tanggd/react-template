import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'

import logo from '@/assets/images/logo.svg'

const { VITE_APP_TITLE } = import.meta.env

export default function Home() {
  const [count, setCount] = useState(0)
  //

  return (
    <div>
      <h1>Home</h1>
      <h2>{VITE_APP_TITLE}</h2>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ width: '200px', height: '200px' }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => {
          setCount(count + 1)
        }}
      >
        count is {count}
      </Button>
    </div>
  )
}
