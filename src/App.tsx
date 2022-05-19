import { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useStore } from '~/store'

import globalStyle from '~/styles/global.style'

const Login = lazy(() => import('~/views/Login.view'))
const Chat = lazy(() => import('~/views/Chat.view'))

function App() {
  globalStyle()

  const isAuthenticated = useStore((state) => state.isAuthenticated)

  return (
    <div className="App">
      <pre>{JSON.stringify({ isAuthenticated }, null, 2)}</pre>
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
