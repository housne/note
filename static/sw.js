importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

~function() {
  if (!workbox) {
    console.log(`Boo! Workbox didn't load 😬`);
    return
  }
  
  const CACHE_VERSION = 1
  
  const webPageHandler = new workbox.strategies.NetworkFirst({
    cacheName: `web-page-cache-v${CACHE_VERSION}`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100
      })
    ]
  })
  
  workbox.routing.registerRoute(/.+\/$/, webPageHandler);
  
  const staticFileHandler = new workbox.strategies.CacheFirst({
    cacheName: `static-file-cache-v${CACHE_VERSION}`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
      })
    ]
  })
  
  workbox.routing.registerRoute(
    /.+\.(js|css|png|gif|jpg|jpeg)/,
    staticFileHandler
  )
}()

