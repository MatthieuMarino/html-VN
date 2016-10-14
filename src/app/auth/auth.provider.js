// import AuthService from './auth.service'
import User from './User.service'

class AuthService {
  constructor($firebaseAuth, Firebase, $location) {
    'ngInject';

    this.user = new User();
    this.Auth = $firebaseAuth();
    this.Firebase = Firebase;
    this.location = $location;
    this.googleProvider = new Firebase.auth.GoogleAuthProvider();


    this.Auth.$onAuthStateChanged(function(firebaseUser) {
     if(firebaseUser){
       // console.log('firebaseUser',  firebaseUser.uid);
        this.setUser(firebaseUser);
      }
    }.bind(this));
  }

  isConnected() {
    return this.user.connected;
  }

  setUser(user){
    this.user.setData(user.email,user.uid);
  }

  getUser() {
    return this.user;
  }

  disconnect() {
    // console.log('this.Auth', this.Auth);
    this.Auth.$signOut();
    this.user.disconnect();
    this.location.path('/');
  };

  connectViaMail(email, password) {
    this.Auth.$signInWithEmailAndPassword(email, password).catch(function (error) {
      console.warn(error);
    })
  };

  connectViaGoogle(){
    firebase.auth().signInWithPopup(this.googleProvider).then(function(result) {

      console.log('result.user', result.user);
      this.Firebase.database().ref('users/'+result.user.uid).once('value', function(data){
        // console.log('data.val()', data.val());
        if(data.val()){
          console.log('update');
          this.Firebase.database().ref('users/'+result.user.uid+'/profilePic').set(result.user.photoURL)
        }else{
          console.log('create');
          this.Firebase.database().ref('users/'+result.user.uid).set({
            newUser: true,
            email: result.user.email,
            firstName: result.user.displayName.slice(0,result.user.displayName.indexOf(' ')),
            lastName: result.user.displayName.slice(result.user.displayName.indexOf(' ')+1, result.user.displayName.length),
            profilePic: result.user.photoURL,
            signupChannel : 'Website'
          })
        }
      }.bind(this));
    }.bind(this)).catch(function(error) {
      // Handle Errors here
      console.log('error', error);
    });
  }


}

export function AuthServiceProvider (){
'ngInject';
  var firebaseUser = false;

  return {
  setConnected : function(user){
    firebaseUser = user;
  },
  $get : ['$firebaseAuth', 'Firebase', '$location', function ($firebaseAuth, Firebase, $location){
    // console.log('firebaseUser', firebaseUser);
    return new AuthService($firebaseAuth, Firebase, $location)
  }]
}

}
