const THEME_SESSION_KEY = 'THEME_SESSION_KEY'
const themeFromCache = localStorage.getItem(THEME_SESSION_KEY)
let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || themeFromCache === 'dark'
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
    localStorage.removeItem(THEME_SESSION_KEY)
  }
}
themeSwitcher.addEventListener('click', toggleDarkMode)
setThemeEmoji(isDarkMode)
