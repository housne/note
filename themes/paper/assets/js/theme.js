const THEME_SESSION_KEY = 'THEME_SESSION_KEY'
const themeFromCache = localStorage.getItem(THEME_SESSION_KEY)
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = themeFromCache || systemTheme
if (theme === 'dark') {
  document.body.classList.add('dark')
}
