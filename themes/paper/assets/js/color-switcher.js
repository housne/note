const THEME_SESSION_KEY = 'THEME_SESSION_KEY'
const themeFromCache = localStorage.getItem(THEME_SESSION_KEY)
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = themeFromCache || systemTheme
let isDarkMode = theme === 'dark'
const themeSwitcher = document.getElementById('color_switch_button')
function setupColorName(isDark) {
  const colorName = isDark ?  LIGHT_COLOR_SCHEME_NAME : DARK_COLOR_SCHEME_NAME
  const colorIcon = isDark ? LIGHT_COLOR_ICON : DARK_COLOR_ICON
  const colorClassName = isDarkMode ? 'light' : 'dark'
  const originColorClassName = isDarkMode ? 'dark' : 'light'
  themeSwitcher.innerHTML = colorIcon + colorName
  themeSwitcher.classList.remove(originColorClassName)
  themeSwitcher.classList.add(colorClassName)
}
function toggleDarkMode() {
  isDarkMode = !isDarkMode
  setupColorName(isDarkMode)
  if (isDarkMode) {
    document.body.classList.add('dark')
    localStorage.setItem(THEME_SESSION_KEY, 'dark')
  } else {
    document.body.classList.remove('dark')
    localStorage.setItem(THEME_SESSION_KEY, 'light')
  }
}
themeSwitcher.addEventListener('click', toggleDarkMode)
setupColorName(isDarkMode)
