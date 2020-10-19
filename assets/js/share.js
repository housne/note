class Toast {
  toastTimer;
  el = document.createElement('div')
  open(tip) {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
      this.close()
    }
    this.el.className = 'toast'
    this.el.innerText = tip
    document.body.appendChild(this.el)
    this.toastTimer = setTimeout(() => {
      this.close()
      this.toastTimer = null
    }, 5000)
  }
  close() {
    try {
      document.body.removeChild(this.el)
    } catch(e) {}
  }
}

const toast = new Toast()
const shareSectionElement = document.getElementById('share_post')
shareSectionElement.addEventListener('click', (event) => {
  const { target } = event
  const shareButton = getShareButton(target, 3)
  const { provider } = shareButton.dataset
  if (!provider) {
    return
  }
  handleShare(provider)
})

if ('share' in navigator) {
  const nativeShareButton = document.createElement('button')
  nativeShareButton.className = 'native-share-button'
  nativeShareButton.innerHTML = `<svg width="1rem" height="1rem" viewBox="0 0 16 16" class="bi bi-three-dots" fill="var(--secondary)" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>`
  nativeShareButton.addEventListener('click', () => {
    navigator.share({
      url: decodeURIComponent(SHARE_URL),
      text: decodeURIComponent(SHARE_TITLE),
      title: decodeURIComponent(SHARE_TITLE)
    })
  })
  shareSectionElement.appendChild(nativeShareButton)
}

document.querySelector('#copy_link_button').addEventListener('click', () => {
  navigator.clipboard.writeText(decodeURIComponent(SHARE_URL)).then(() => {
    toast.open('复制成功')
  }).catch(() => {
    toast.open('复制失败')
  })
})

function getShareButton(node, depth = 3) {
  let currentDepth = 0
  let parentNode = node
  let isFound = false
  do {
    if (parentNode.tagName.toLowerCase() === 'button') {
      isFound = true
    } else {
      parentNode = parentNode.parentNode
      currentDepth ++
    }
  } while (currentDepth < depth && !isFound)
  return parentNode
}

function handleShare(provider) {
  let url = ''
  switch(provider) {
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${SHARE_TITLE}&url=${SHARE_URL}`
      break
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}&t=${SHARE_TITLE}`
      break
    case 'weibo':
        url = `https://service.weibo.com/share/share.php?title=${SHARE_TITLE}&url=${SHARE_URL}`
        break
    case 'telegram':
      url = `https://t.me/share/url?text=${SHARE_TITLE}&url=${SHARE_URL}`
      break
    case 'wechat':
      url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${SHARE_URL}`
      break
  }
  if (!url) {
    return
  }
  window.open(url, 'SHARE_WINDOW', 'width=500,height=500', true)
}

