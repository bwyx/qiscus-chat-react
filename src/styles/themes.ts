import { createTheme } from '~/styles'

export const lightTheme = {
  rgb: {
    brand: '121 116 14', // #79740e
    accent: '181 118 20', // #b57614
    fg1: '$rgb$gray-800',
    fg2: '$rgb$gray-700',
    fg3: '$rgb$gray-600',
    bg: '250 250 250' // #fafafa
  }
}

export const darkTheme = {
  rgb: {
    brand: '184 187 38', // #b8bb26
    accent: '250 189 47', // #fabd2f
    fg1: '$rgb$gray-100',
    fg2: '$rgb$gray-300',
    fg3: '$rgb$gray-500',
    bg: '16 17 14' // #10110e
  }
}

const themes = {
  light: createTheme('light', lightTheme).toString(),
  dark: createTheme('dark', darkTheme).toString()
}

export const on = (...themeNames: Array<keyof typeof themes>) =>
  themeNames.map((name) => `.${themes[name]} &`).join(', ')

export const colorScheme = Object.values(themes).join(' ')

export type RGBTheme = keyof typeof lightTheme.rgb & keyof typeof darkTheme.rgb
export default themes
