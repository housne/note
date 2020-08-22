const THEME_SESSION_KEY = 'THEME_SESSION_KEY'
const themeFromCache = localStorage.getItem(THEME_SESSION_KEY)
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = themeFromCache || systemTheme
let isDarkMode = theme === 'dark'
const themeSwitcher = document.getElementById('theme-switcher')
function setThemeEmoji(isDark) {
  const themeEmoji = isDark ? '🌝' : '🌚'
  themeSwitcher.innerHTML = themeEmoji
}
function toggleDarkMode() {
  isDarkMode = !isDarkMode
  setThemeEmoji(isDarkMode)
  if (isDarkMode) {
    document.body.classList.add('dark')
    localStorage.setItem(THEME_SESSION_KEY, 'dark')
  } else {
    document.body.classList.remove('dark')
    localStorage.setItem(THEME_SESSION_KEY, 'light')
  }
}
themeSwitcher.addEventListener('click', toggleDarkMode)
setThemeEmoji(isDarkMode)
