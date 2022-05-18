import useTheme from '~/hooks/useTheme'
import { Switch } from '~/components/base'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
}

export default ThemeSwitcher
