// Polyfills for older browser compatibility

// Array.includes() polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or undefined');
    }
    const o = Object(this);
    const len = o.length >>> 0;
    if (len === 0) return false;
    const n = fromIndex | 0;
    let k = Math.max(n >= 0 ? n : len + n, 0);
    while (k < len) {
      if (o[k] === searchElement) return true;
      k++;
    }
    return false;
  };
}

// Object.entries() polyfill
if (!Object.entries) {
  Object.entries = function(obj) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i);
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

// String.padStart() polyfill
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length >= targetLength) {
      return String(this);
    }
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(this);
  };
}

// Promise.finally() polyfill
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason; })
    );
  };
}

// Element.matches() polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s);
      let i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

// Mobile browser polyfills and fixes

// Touch events polyfill for non-touch devices
if (!('ontouchstart' in window)) {
  document.documentElement.classList.add('no-touch');
}

// Prevent double-tap zoom on mobile
document.addEventListener('touchstart', (event) => {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Fix for iOS input zoom
document.addEventListener('focus', (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    event.target.style.fontSize = '16px';
  }
}, true);

// Fix for iOS scroll bounce
document.body.style.overscrollBehavior = 'none';

// Import core polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Fix for mobile viewport height
function updateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', updateVh);
window.addEventListener('orientationchange', updateVh);
updateVh();

// Add any other specific polyfills needed for your application
// For example:
// import 'whatwg-fetch'; // For fetch API
// import 'intersection-observer'; // For Intersection Observer API
// import 'resize-observer-polyfill'; // For Resize Observer API 