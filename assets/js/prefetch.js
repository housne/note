function prefetchFactory() {
  const cached = []
  return function(url) {
    if (cached.indexOf(url) > -1) {
      return
    }
    const link = document.createElement('link')
    link.href = url
    link.rel = 'prefetch'
    link.as = 'document'
    link.addEventListener('load', function() {
      try {
        document.head.removeChild(link)
      } catch(e) {}
    })
    document.head.appendChild(link)
    cached.push(url)
  }
}

const prefetch = prefetchFactory()

const allPageLink = Array.from(document.querySelectorAll('a')).filter(link => !/^(https?:\/\/|#)/i.test(link.getAttribute('href')))
allPageLink.forEach(link => {
  link.addEventListener('mouseenter', () => prefetch(link.href))
  link.addEventListener('touchstart', () => prefetch(link.href))
})