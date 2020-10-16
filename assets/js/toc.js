let toc = []
let activeHeadingIndex = undefined
window.addEventListener('load', () => {
  toc = setupToc()
  if (toc.length === 0) {
    return
  }
  const tocMarkup = document.createElement('div')
  tocMarkup.innerHTML = setupTOCMarkup(toc)
  tocMarkup.className = 'post-toc'
  document.querySelector('#post_single').appendChild(tocMarkup)
  const handlePageScroll = throttle(scrollHandler, 100)
  window.addEventListener('scroll', handlePageScroll)
})


function setupToc() {
  const postContent = document.querySelector('#post_content')
  const headings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
  return Array.from(headings).map(heading => ({
    weight: heading.tagName.replace(/h/i, ''),
    id: heading.id,
    label: heading.innerHTML,
    top: getCoords(heading).top
  }))
}

function setupTOCMarkup(toc) {
  return toc.map((heading, index) => `
    <div class="toc-heading" id="toc_heading_${index}">
      <div class="pill pill-${heading.weight}"></div>
      <a href="#${heading.id}">${heading.label}</a>
    </div>
  `).join('')
}

function updateActiveHeading(index) {
  document.querySelectorAll('.toc-heading').forEach(heading => heading.classList.remove('active'))
  document.querySelector(`#toc_heading_${index}`).classList.add('active')
}

function scrollHandler() {
  const scrollTop = window.scrollY + window.innerHeight / 2
  const activeIndex = getCurrentActiveIndex(scrollTop)
  if (typeof activeIndex === 'undefined') {
    return
  }
  if (activeHeadingIndex === activeIndex) {
    return
  }
  updateActiveHeading(activeIndex)
  activeHeadingIndex = activeIndex
}

function getCurrentActiveIndex(scrollTop) {
  const lastIndex = toc.length - 1
  if (scrollTop >= toc[lastIndex].top) {
    return lastIndex
  }
  for(let i=0; i<toc.length; i++) {
    const current = toc[i]
    const nextIndex = i === toc.length - 1 ? toc.length - 1 : i + 1
    const next = toc[nextIndex]
    if (scrollTop >= current.top && scrollTop < next.top) {
      return i
    }
  }
  return undefined
}

function throttle(func, delay) {
  let timeout = null
  return function(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args)
        timeout = null
      }, delay)
    }
  }
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}