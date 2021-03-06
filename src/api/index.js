// Firebase Imported
import Firebase from 'firebase'
import 'firebase/database'

const logRequests = !!process.env.DEBUG_API

const api = function() {
    Firebase.initializeApp({
        databaseURL: 'https://hacker-news.firebaseio.com'
    })
    return Firebase.database().ref('/v0')
}()

function warmApi() {
    fetchItems((api.cachedIds.top || []).slice(0, 30))
    setTimeout(`warmCache`, 1000 * 60 * 15)
}

if (api.onServer) {
    warmApi()
    console.log('Server is on the air');
} else {
    console.log('Just wait for another sec');
}


function fetch (child) {
    logRequests && console.log(`fetching ${child}...`)
    const cache = api.cachedItems
    if (cache && cache.has(child)) {
      logRequests && console.log(`cache hit for ${child}.`)
      return Promise.resolve(cache.get(child))
    } else {
      return new Promise((resolve, reject) => {
        api.child(child).once('value', snapshot => {
          const val = snapshot.val()
          // mark the timestamp when this item is cached
          if (val) val.__lastUpdated = Date.now()
          cache && cache.set(child, val)
          logRequests && console.log(`fetched ${child}.`)
          resolve(val)
        }, reject)
      })
    }
  }
  
  // TODO: 看看LRU策略
  export function fetchIdsByType (type) {
    console.log('fetch Type:', api);
    return api.cachedIds && api.cachedIds[type]
      ? Promise.resolve(api.cachedIds[type])
      : fetch(`${type}stories`)
  }
  
  export function fetchItem (id) {
    return fetch(`item/${id}`)
  }
  
  export function fetchItems (ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
  }
  
  export function fetchUser (id) {
    return fetch(`user/${id}`)
  }

  export function watchList (type, cb) {
    let first = true
    const ref = api.child(`${type}stories`)
    const handler = snapshot => {
      if (first) {
        first = false
      } else {
        cb(snapshot.val())
      }
    }
    ref.on('value', handler)
    return () => {
      ref.off('value', handler)
    }
  }
