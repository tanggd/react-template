import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <Button type="primary" icon={<SearchOutlined />}>
        Button
      </Button>
    </div>
  )
}
