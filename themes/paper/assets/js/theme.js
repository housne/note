const THEME_SESSION_KEY = 'THEME_SESSION_KEY'
const themeFromCache = localStorage.getItem(THEME_SESSION_KEY)
let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || themeFromCache === 'dark'
if (isDarkMode) {
  document.body.classList.add('dark')
}
