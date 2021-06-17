import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AsyncPipe, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CopyClipboardDirective} from './services/copy-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    CopyClipboardDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:45000'
    })
  ],
  providers: [
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
