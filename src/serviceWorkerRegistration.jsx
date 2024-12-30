// src/serviceWorkerRegistration.js

// This is the service worker registration logic
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname === '127.0.0.1'
  );
  
  export function register() {
    if (isLocalhost) {
      console.log('Service worker is not supported on localhost.');
      return;
    }
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js') // This is the default service worker file location
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Service Worker unregistration failed:', error);
        });
    }
  }
  