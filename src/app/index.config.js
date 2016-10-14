export function config (Firebase) {
  'ngInject';


  var config = {
    apiKey: "AIzaSyAh5ImAK8YtHK_vzQYEXxCkBSIQeLpHssk",
    authDomain: "dyou-vn.firebaseapp.com",
    databaseURL: "https://dyou-vn.firebaseio.com",
    storageBucket: "dyou-vn.appspot.com",
    messagingSenderId: "132011403426"
  };
  Firebase.initializeApp(config);
}
