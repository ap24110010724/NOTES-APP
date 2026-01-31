// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB0O5YxugGEb0-NmErnMa1V8ccGiOxKN4c",
  authDomain: "notes-app-b23a4.firebaseapp.com",
  projectId: "notes-app-b23a4",
  storageBucket: "notes-app-b23a4.appspot.com",
  messagingSenderId: "291987997272",
  appId: "1:291987997272:web:f6b6d61a08b39dffbec02d"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ✅ MAKE THEM GLOBAL
window.auth = firebase.auth();
window.db = firebase.firestore();
