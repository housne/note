const THEME_SESSION_KEY = 'THEME_SESSION_KEY'
const themeFromCache = localStorage.getItem(THEME_SESSION_KEY)
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = themeFromCache || systemTheme
let isDarkMode = theme === 'dark'
const themeSwitcher = document.getElementById('color_switch_button')
const LIGHT_COLOR_ICON = `
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-brightness-high-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
    <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
  </svg>
`;
const DARK_COLOR_ICON = `
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-moon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
  </svg>
`;
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
