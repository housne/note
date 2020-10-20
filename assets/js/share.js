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
    }, 3000)
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
  nativeShareButton.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
    <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
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

