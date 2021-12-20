import { Link, useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()
  return <div>
    <h2>404 not found!</h2>
    <p>
      <Link to="/">Go to the home page</Link>
    </p>
    <button onClick={() => {
      navigate('/about')
    }}>点击我，去到about页面</button>
  </div>
}