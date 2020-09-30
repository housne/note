const searchButton = document.getElementById('search_btn')
const searchLayout = document.getElementById('search_mask')
const searchInput = document.getElementById('search_mask_input')
const closeSearchButton = document.getElementById('close_search_btn')
let isSearchShowed = false
if (!searchButton) {
  return
}
searchButton.addEventListener('click',showSearch)
closeSearchButton.addEventListener('click', hideSearch)

function showSearch() {
  searchLayout.style.display = 'flex'
  searchInput.focus()
  isSearchShowed = true
}

function hideSearch() {
  searchLayout.style.display = ''
  searchInput.value = ''
  isSearchShowed = false
}

document.addEventListener('keyup', hideOnEscape)

function hideOnEscape(event) {
  if (!isSearchShowed) {
    return
  }
  const ESCAPE_KEY_CODE = 'escape'
  if (event.key.toLowerCase() !== ESCAPE_KEY_CODE) {
    return
  }
  hideSearch()
}