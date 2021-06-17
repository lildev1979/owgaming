import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {SwUpdate} from '@angular/service-worker';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UpdateService {

  swSub;

  constructor(private swUpdate: SwUpdate,
              @Inject(PLATFORM_ID) private platformId: object) {

    if (isPlatformBrowser(this.platformId) && environment.production) {
      if ('serviceWorker' in navigator) {
        this.swSub = this.swUpdate.available.subscribe(event => {
          console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
          if (event.current.hash !== event.available.hash) {
            // New Version! Reload in 3 sec.
            setTimeout(() => {
              window.location.reload();
            }, 350);
          }
          this.swSub.unsubscribe();
        });
        this.swUpdate.activated.subscribe(event => {
          console.log('[App] Update activated: old version was', event.previous, 'new version is', event.current);
        });
      }
    }
  }

  public checkForUpdate() {
    console.log('[App] checkForUpdate started');
    this.swUpdate.checkForUpdate()
      .then(() => {
        console.log('[App] checkForUpdate completed');
        this.activateUpdate();
      })
      .catch(err => {
        console.error(err);
      });
  }

  public activateUpdate() {
    console.log('[App] activateUpdate started');
    this.swUpdate.activateUpdate()
      .then(() => {
        console.log('[App] activateUpdate completed');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
