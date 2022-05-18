import { useEffect, useState } from 'react'
import themes from '~/styles/themes'

const useTheme = () => {
  const [theme, setTheme] = useState(themes.light)
  const toggleTheme = () => {
    window.__setPreferredTheme(
      theme === themes.light ? themes.dark : themes.light
    )
  }

  useEffect(() => {
    setTheme(window?.__theme || themes.light)
    window.__onThemeChange = setTheme
  }, [])

  return { theme, toggleTheme }
}

export default useTheme
