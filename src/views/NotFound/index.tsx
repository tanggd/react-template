import { Link } from "react-router-dom"

export default function NotFound() {
  return <div>
    <h2>404 not found!</h2>
    <p>
      <Link to="/">Go to the home page</Link>
    </p>
  </div>
}