import Settings from '../settings.json';

const { corsProxy } = Settings;
const ONE_DAY = 24 * 60 * 60 * 1000;

async function fetchProxy(url) {
  return fetch(`${corsProxy}${url}`);
}

// Fetch content online
async function fetchJson(url) {
  const response = await fetchProxy(url);
  if(!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function fetchAndCache(cache, url) {
  const response = await fetchProxy(url);

  const newHeaders = new window.Headers(response.headers);
  newHeaders.set('Time-Cached', Date.now().toString());

  const newResponse = response.clone();
  newResponse.headers = newHeaders;
  cache.put(url, newResponse);

  return newResponse;
}

function isOld(response, maxAge) {
  const now = Date.now();
  const cached = parseInt(response.headers.get('Time-Cached'), 10);

  return (now - cached) > maxAge;
}

// Fetch content from cache or online if necessary
async function fetchJsonCached(url, opts = { maxAge: ONE_DAY }) {
  const cache = await window.caches.open('v1');
  let cachedResponse = await cache.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    // Fetch response and cache it
    cachedResponse = await fetchAndCache(cache, url);
  } else if (isOld(cachedResponse, opts.maxAge)) {
    // Fetch new version and cache it for next time,
    // but return old response now to save time
    fetchAndCache(cache, url);
  }

  return await cachedResponse.json();
}

export {
  fetchJson,
  fetchJsonCached,
};
