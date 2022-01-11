
function SWManager() { };

SWManager.registration;

SWManager.startUp = function() 
{
  // check if the browser supports serviceWorker at all
  if ('serviceWorker' in navigator) 
  {
    // wait for the page to load
    window.addEventListener('load', async () => 
    {
      // register the service worker from the file specified
      const registration = await navigator.serviceWorker.register( 'service-worker.js' );
      SWManager.registration = registration;

      // ensure the case when the updatefound event was missed is also handled
      // by re-invoking the prompt when there's a waiting Service Worker
      if (registration.waiting) {
        SWManager.invokeServiceWorkerUpdateFlow(registration);
      }

      // detect Service Worker update available and wait for it to become installed
      registration.addEventListener('updatefound', () => 
      {
        if (registration.installing) 
        {
          // wait until the new Service worker is actually installed (ready to take over)
          registration.installing.addEventListener('statechange', () => 
          {
            if (registration.waiting) 
            {
              // if there's an existing controller (previous Service Worker), show the prompt
              if (navigator.serviceWorker.controller) 
              {
                SWManager.invokeServiceWorkerUpdateFlow(registration);
              } 
              else 
              {
                // otherwise it's the first install, nothing to do
                console.log('Service Worker initialized for the first time');
              }
            }
          })
        }
      });

      let refreshing = false;

      // detect controller change and refresh the page
      navigator.serviceWorker.addEventListener('controllerchange', () => 
      {
        if ( !refreshing ) 
        {
          window.location.reload();
          refreshing = true;
        }
      });

    });

  };

};


SWManager.invokeServiceWorkerUpdateFlow = function( registration ) 
{
  // TODO implement your own UI notification element

  // BOKYUNG WILL IMPLEMENT MSG & CLICK..
  /*
  notification.show("New version of the app is available. Refresh now?");

  notification.addEventListener('click', () => 
  {
      if (registration.waiting) {
          // let waiting Service Worker know it should became active
          registration.waiting.postMessage('SKIP_WAITING')
      }
  });
  */

  alert("New version of the app is available. Refresh now?");

  if ( registration.waiting ) 
  {
    // let waiting Service Worker know it should became active
    registration.waiting.postMessage('SKIP_WAITING');
  }

};


// Call here for manually checking for sw update..
SWManager.checkSWUpdate = function() 
{
    // Trigger the sw change/update check event..
    if ( SWManager.registration ) 
    {        
        console.log( 'SWManager.registration.update requested..' );

        SWManager.registration.update();        
    }
};


/*
function serviceWorkerStart() {
//window.isUpdateAvailable = new Promise(function(resolve, reject) {
  // lazy way of disabling service workers while developing
  if ('serviceWorker' in navigator )
  //&& ['localhost', '127'].indexOf(location.hostname) === -1
  {
    // register service worker file
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
                switch (installingWorker.state) {
                  case 'installed':
                      if (navigator.serviceWorker.controller) {
                        // new update available
                        console.log( 'Update Found.' );
                        //resolve(true);
                      } else {
                        // no update available
                        console.log( 'No Update Found.' );
                        //resolve(false);
                      }
                      break;
                }
            };
          };
      })
      .catch(err => console.error('[SW ERROR]', err));
  }
  //});

};
*/


// ============================================
// StartUp Runs

//serviceWorkerStart();

SWManager.startUp();

// ============================================
