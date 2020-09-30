(async () => {
  console.log(SEARCH_PAGE_PREFIX)
  const searchIndexFile = 'searchindex.json'
  const searchIndexURL = `${SEARCH_PAGE_PREFIX}${searchIndexFile}`;
  const searchRequest = await fetch(searchIndexURL)
  const searchIndex = await searchRequest.json()
  const fuse = new Fuse(searchIndex, {
    keys: ['title', 'tags', 'summary'],
    threshold: 0.5
  })
  const searchFn = (event) => {
    const keyword = event.target.value
    const results = fuse.search(keyword)
    renderSearchResult(results, keyword)
  }
  const search = debounce(searchFn, 200)
  const searchInput = document.getElementById('search_input')
  searchInput.addEventListener('input', search)
  const keyword = getSearchTermFromURL('q')
  if (!keyword) {
    return
  } 
  searchFn({ target: { value: keyword }})
  searchInput.value = keyword
})()

function renderSearchResult(results, keyword) {
  const resultDOM = results.map(i => renderSearchItem(i.item)).join('')
  const searchResultElement = document.getElementById('search_results')
  searchResultElement.innerHTML = resultDOM
  const mark = new Mark(searchResultElement)
  mark.mark(keyword)
}

function renderSearchItem(item) {
  return `
    <a class="entry-link" href="${item.uri}">
      <article class="post-entry">
        <header class="entry-header">
          <h2>${item.title}</h2>
        </header>
        <section class="entry-content">${item.summary}</section>
      </article>
    </a>
  `
}

function debounce(fn, timeout) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    const later = () => {
      clearTimeout(timer)
      fn(...args)
    }
    timer = setTimeout(later, timeout)
  }
}

function getSearchTermFromURL(key) {
  const { search }  = window.location
  const searchTerms = search.slice(1).split('&')
  const termObj = searchTerms.reduce((terms, term) => {
    const [key, value] = term.split('=')
    return {
      ...terms,
      [key]: value
    }
  }, {})
  if (key) {
    return termObj[key]
  }
  return termObj
}

