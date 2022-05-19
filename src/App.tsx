import { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useStore } from '~/store'

import globalStyle from '~/styles/global.style'

const Login = lazy(() => import('~/views/Login.view'))
const Chat = lazy(() => import('~/views/Chat.view'))

function App() {
  globalStyle()

  const user = useStore((state) => state.user)

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
      </nav>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
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
