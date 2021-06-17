// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCxcw4G-L18S22AkDmmRcDxVIMOvptqL90",
  authDomain: "overWorldplatform.firebaseapp.com",
  databaseURL: "https://overWorldplatform.firebaseio.com",
  projectId: "overWorldplatform",
  storageBucket: "overWorldplatform.appspot.com",
  messagingSenderId: "233958278349",
  appId: "1:233958278349:web:ad6900608c1716b3719584",
  measurementId: "G-L4YQ3RYGJH"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
