import { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import globalStyle from '~/styles/global.style'

const Login = lazy(() => import('~/views/Login'))
const Chat = lazy(() => import('~/views/Chat'))

function App() {
  globalStyle()

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<>...</>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/chat"
          element={
            <Suspense fallback={<>...</>}>
              <Chat />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}

export default App
