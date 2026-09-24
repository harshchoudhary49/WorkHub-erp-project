self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});

// Listen for background sync events
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-attendance') {
    console.log('Service Worker: Syncing offline attendance...');
    event.waitUntil(syncAttendanceData());
  }
});

// A mock function simulating sending stored offline data to the backend
async function syncAttendanceData() {
  // In a real app, you would read offline actions from IndexedDB here
  // and send them to your API.
  console.log('Service Worker: Offline attendance data successfully synced!');
}

self.addEventListener('fetch', (event) => {
  // Can add basic caching strategies here if needed
});
