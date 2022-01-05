
// Require WorkBox build
const {generateSW} = require('workbox-build');
//const {Workbox} = require('workbox-window');

generateSW({
  mode: 'production',
  swDest: 'PWAApp/service-worker.js',
  globDirectory: 'PWAApp',
  globPatterns: [
    '**/*.{html,css,js,gif,jpg,png,svg,mp3,wav,json}'
  ],
  skipWaiting: true,
  clientsClaim: true,
  offlineGoogleAnalytics: false,
  cleanupOutdatedCaches: false,
  runtimeCaching: [
  ]

}).then(({count, size}) => {
  console.log(`Generated new service worker with ${count} precached files, totaling ${size} bytes.`);
}).catch(console.error);
