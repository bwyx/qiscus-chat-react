import { addDecorator } from '@storybook/react'
import globalStyles from '../src/styles/global.style'
import ThemeSwitcher from '../src/components/ThemeSwitcher'

addDecorator((story) => {
  globalStyles()
  return (
    <>
      {story()}
      <div style={{ position: 'fixed', bottom: 15, right: 15 }}>
        <ThemeSwitcher />
      </div>
    </>
  )
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const themeListener = (Story, context) => {
  function setTheme(newTheme) {
    document.body.className = newTheme
    window.__theme = newTheme
    window.__onThemeChange(newTheme)
  }
  window.__onThemeChange = function () {}
  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', JSON.stringify(window.__theme))
    } catch (err) {}
  }
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function (event) {
    window.__setPreferredTheme(event.matches ? 'dark' : 'light')
  })
  let preferredTheme
  try {
    preferredTheme = JSON.parse(localStorage.getItem('theme'))
  } catch (err) {}
  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))

  return <Story {...context} />
}

export const decorators = [themeListener]
