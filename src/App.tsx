import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import QiscusProvider from '~/providers/QiscusProvider'

import { css } from '~/styles'
import globalStyle from '~/styles/global.style'

const Login = lazy(() => import('~/views/Login.view'))
const Profile = lazy(() => import('~/views/Profile.view'))
const Lobby = lazy(() => import('~/views/Lobby.view'))
const Chat = lazy(() => import('~/views/Chat.view'))
const NewChat = lazy(() => import('~/views/NewChat.view'))

const styles = {
  mobileFrame: css({
    '::-webkit-scrollbar': {
      display: 'none'
    },
    '@sm': {
      margin: '50px auto',
      width: '375px',
      height: '812px',
      position: 'relative',
      borderRadius: '50px',
      '&:after': {
        content: "''",
        width: '395px',
        height: '833px',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        borderRadius: '50px',
        border: '10px solid rgb($rgb$brand)',
        pointerEvents: 'none',
        zIndex: 999
      },
      '&:before': {
        content: "''",
        width: '185px',
        transform: 'translate3d(-50%,0,0)',
        height: '30px',
        top: '-1px',
        left: '50%',
        background: 'rgb($rgb$brand)',
        position: 'absolute',
        borderRadius: '0 0 20px 20px',
        zIndex: 999
      }
    }
  })(),
  screen: css({
    '@sm': {
      display: 'flex',
      flexDirection: 'column',
      pt: '$10',
      margin: '0',
      width: '375px',
      height: '813px',
      position: 'relative',
      overflow: 'hidden',
      main: {
        flexGrow: 1,
        maxHeight: '100%',
        overflowX: 'auto'
      },
      '.border-fix': {
        position: 'absolute',
        left: '-1px',
        right: '-1px',
        zIndex: 99,
        pointerEvents: 'none',
        '&:before, &:after': {
          xBackground: '$bg',
          content: "''",
          width: '10px',
          height: '10px',
          position: 'absolute',
          transitionProperty: 'background-color, color',
          transitionDuration: '300ms',
          transitionTimingFunction: 'cubic-bezier(0,.89,.44,1)'
        },
        '&:before': { left: '0' },
        '&:after': { right: '0' },
        '&.top': { top: '0' },
        '&.bottom': { bottom: '10px' }
      },
      '.iOS-system-swipeable': {
        mt: '$4',
        mb: '$2',
        xBackground: '$fg1',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        display: 'block',
        width: '140px',
        height: '6px',
        borderRadius: '$full',
        pointerEvents: 'none',
        transform: 'translateX(-50%)'
      }
    }
  })()
}

const App = ({ children }: { children: React.ReactNode }) => (
  <div className="App">
    <div className={styles.mobileFrame}>
      <div className={styles.screen}>
        <div className="border-fix top" />
        <main>{children}</main>
        <span className="iOS-system-swipeable" />
        <div className="border-fix bottom" />
      </div>
    </div>
  </div>
)

export default function () {
  globalStyle()

  return (
    <QiscusProvider>
      <App>
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
            path="/me"
            element={
              <Suspense fallback={<>...</>}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/lobby"
            element={
              <Suspense fallback={<>...</>}>
                <Lobby />
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
          <Route
            path="chat/new"
            element={
              <Suspense fallback={<>...</>}>
                <NewChat />
              </Suspense>
            }
          />
        </Routes>
      </App>
    </QiscusProvider>
  )
}
