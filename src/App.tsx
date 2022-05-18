import ThemeSwitcher from '~/components/ThemeSwitcher'

import globalStyle from '~/styles/global.style'

function App() {
  globalStyle()

  return (
    <div className="App">
      <ThemeSwitcher />
    </div>
  )
}

export default App
