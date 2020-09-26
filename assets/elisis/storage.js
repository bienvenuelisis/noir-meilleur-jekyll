//Must import cookie-js from https://github.com/js-cookie/js-cookie

//if (typeof optionalArg === 'undefined') { optionalArg = 'default'; }
//optionalArg = (typeof optionalArg === 'undefined') ? 'default' : optionalArg;

//function myFunc(requiredArg, optionalArg = 'defaultValue') {
//     // do stuff
// }
//

//function foo(a, b) {
//   a = typeof a !== 'undefined' ? a : 42;
//   b = typeof b !== 'undefined' ? b : 'default_b';
//   ...
// }


const defaultCookieExpiry = 7;

const sessionLocalStorageUniqKey = 'sessionLocalStorageUniqKey';

const sessionLocalStorageInfoKey = 'sessionLocalStorageInfoKey';

const cacheDefaultName = 'elisis_cache';

const hasCacheAPI = ('caches' in window);

function cacheAddUrl(url) {
    if (hasCacheAPI)
        caches.open(cacheDefaultName).then(function (cache) {
            cache.add(url);
            return true;
        });

    return false;
}

function cacheAddAllUrl(urls) {
    if (hasCacheAPI)
        caches.open(cacheDefaultName).then(function (cache) {
            cache.addAll(urls)
                .then(function () {
                    return true;
                });
        });

    return false;
}

/**
 * caches.open('test-cache').then(function(cache) {
  cache.add(new Request('/page/1', { request options }));
});
 */
function cacheAddRequest(url, requestOptions) {
    if (hasCacheAPI)
        caches.open(cacheDefaultName).then(function (cache) {
            cache.add(new Request(url, requestOptions));
            return true;
        });

    return false;
}

function cachePutUrl(url) {
    if (hasCacheAPI)
        fetch(url).then(function (response) {
            return caches.open(cacheDefaultName).then(function (cache) {
                return cache.put(url, response);
            });
        });

    return false;
}

/**
 * retrieve an array of cached Request objects:
 * Request {
  bodyUsed: false
  credentials: "omit"
  headers: Headers
  integrity: ""
  method: "GET"
  mode: "no-cors"
  redirect: "follow"
  referrer: ""
  url: "https://ecare-sante.com"
}
 */
function cacheGetAllRequests() {
    if (hasCacheAPI)
        caches.open(cacheDefaultName).then(function (cache) {
            cache.keys().then(function (cachedRequests) {
                return cachedRequests; // [Request, Request]
            });
        });

    return false;
}

/**
 * Response {
  body: (...),
  bodyUsed: false,
  headers: Headers,
  ok: true,
  status: 200,
  statusText: "OK",
  type: "basic",
  url: "https://ecare-sante.com"
}
 */
function cacheGetResponse(url) {
    if (hasCacheAPI)
        caches.open(cacheDefaultName).then(function (cache) {
            cache.match(url).then(function (matchedResponse) {
                return matchedResponse;
            });
        });

    return false;
}

function cacheRemoveUrl(url) {
    if (hasCacheAPI)
        caches.open(cacheDefaultName).then(function (cache) {
            cache.delete(url);
            return true;
        });

    return false;
}

/**
 * get the names of existing caches
 */

function cacheKeys() {
    if (hasCacheAPI)
        caches.keys().then(function (cacheKeys) {
            console.log(cacheKeys); // ex: ["test-cache"]
        });

    return false;
}

function cacheDelete() {
    if (hasCacheAPI)
        caches.delete(cacheDefaultName).then(function () {
            return true;
        });

    return false;
}

function resolveLocalStorageUnExists() {
    if (!window.localStorage) {
        Object.defineProperty(window, "localStorage", new (function () {
            var aKeys = [], oStorage = {};
            Object.defineProperty(oStorage, "getItem", {
                value: function (sKey) {
                    return sKey ? this[sKey] : null;
                },
                writable: false,
                configurable: false,
                enumerable: false
            });
            Object.defineProperty(oStorage, "key", {
                value: function (nKeyId) {
                    return aKeys[nKeyId];
                },
                writable: false,
                configurable: false,
                enumerable: false
            });
            Object.defineProperty(oStorage, "setItem", {
                value: function (sKey, sValue) {
                    if (!sKey) {
                        return;
                    }
                    document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                },
                writable: false,
                configurable: false,
                enumerable: false
            });
            Object.defineProperty(oStorage, "length", {
                get: function () {
                    return aKeys.length;
                },
                configurable: false,
                enumerable: false
            });
            Object.defineProperty(oStorage, "removeItem", {
                value: function (sKey) {
                    if (!sKey) {
                        return;
                    }
                    document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                },
                writable: false,
                configurable: false,
                enumerable: false
            });
            this.get = function () {
                var iThisIndx;
                for (var sKey in oStorage) {
                    iThisIndx = aKeys.indexOf(sKey);
                    if (iThisIndx === -1) {
                        oStorage.setItem(sKey, oStorage[sKey]);
                    } else {
                        aKeys.splice(iThisIndx, 1);
                    }
                    delete oStorage[sKey];
                }
                for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
                    oStorage.removeItem(aKeys[0]);
                }
                for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
                    aCouple = aCouples[nIdx].split(/\s*=\s*/);
                    if (aCouple.length > 1) {
                        oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
                        aKeys.push(iKey);
                    }
                }
                return oStorage;
            };
            this.configurable = false;
            this.enumerable = true;
        })());
    }
}

resolveLocalStorageUnExists();

function cookieSet(name, value, expiry, path) {
    expiry = typeof expiry !== 'undefined' ? expiry : defaultCookieExpiry;

    if (typeof path !== 'undefined') {
        Cookies.set(name, value, {
            expires: expiry,
            path: path
        });
    } else
        Cookies.set(name, value, {
            expires: expiry
        });
}

function cookieGet(name) {
    return Cookies.get(name);
}

function cookieBool(name) {
    let value = Cookies.get(name);
    return value === true || value === 'true';
}

function cookieGetAll() {
    return Cookies.get();
}

function cookieRemove(name, path) {
    if (typeof path !== 'undefined') {
        Cookies.remove(name, {path: path});
    } else
        Cookies.remove(name);
}

function storageSet(key, value) {
    localStorage.setItem(key, value);
}

function storageRemove(key) {
    localStorage.removeItem(key);
}

function storageClear(key) {
    localStorage.clear();
}

function storageGet(key) {
    return localStorage.getItem(key);
}

function storageExists(key) {
    return localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null;
}

function storageBool(key) {
    return localStorage.getItem(key) === true || localStorage.getItem(key) === 'true';
}

function storagelength() {
    return localStorage.length;
}

function actionOnKeys(action) {
    for (let i = 0; i < localStorage.length; i++) {
        action(localStorage.key(i));
    }
}

function actionOnValues() {
    for (let i = 0; i < localStorage.length; i++) {
        action(storageGet(localStorage.key(i)));
    }
}

function storageContainsKey(key) {
    let value = storageGet(key);
    return (value !== undefined && value !== null && objectLength(value) > 0);
}

function sessionLocalStorageInit() {
    if (!storageContainsKey(sessionLocalStorageUniqKey)) {
        storageSet(sessionLocalStorageUniqKey, generateString(25));
    }
}

function getSessionLocalStorage() {
    return storageGet(sessionLocalStorageUniqKey);
}

function getVisitorInfo() {
    let userInfo = new Map();
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes(sessionLocalStorageInfoKey)) {
            let value = storageGet(key);
            key.replace(sessionLocalStorageInfoKey + '-', '');
            userInfo.set(key, value);
        }
    }
    return map;
}

function initUserInfoStorage() {
    setVisitorInfo('ip_address', getUserIpAddress());
}

function setVisitorInfo(key, value) {
    storageSet(sessionLocalStorageInfoKey + '-' + key, value);
}

function getSessionLocalStorageInit() {
    sessionLocalStorageInit();
    return storageGet(sessionLocalStorageUniqKey);
}

