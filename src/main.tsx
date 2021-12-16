import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

console.log('import.meta.env：', import.meta.env.VITE_APP_TITLE)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
