~function() {
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
    } else {
      document.body.classList.remove('dark')
    }
  }
  themeSwitcher.addEventListener('click', toggleDarkMode)
  setThemeEmoji(isDarkMode)
}()