"use strict";

/**
 * @name UserFactory
 * @description Factory to get user objects from the firebase
 */
export class UserFactory {
  constructor($http, $q, Firebase, $firebaseArray, $firebaseObject, AuthService) {
    'ngInject';

    this.Firebase = Firebase;
    this.userRef = Firebase.database().ref('users');
    this.$firebaseArray = $firebaseArray;
    this.$firebaseObject = $firebaseObject;
    this.AuthService = AuthService;
    this.$http = $http;
    this.$q = $q;
  }

  isConnected() {
    return this.AuthService.isConnected();
  }

  /**
   *
   * @returns {*}
   */
  getUserId() {
    return this.AuthService.getUser().uid;
  }

  /**
   * @description allow to change the login email
   * @param email
   * @returns {*|{name, b}}
   */
  changeEmail(email) {
    var user = this.Firebase.auth().currentUser;
    return user.updateEmail(email)
  }

  /**
   * @description allow to change the current password
   * @param password
   */
  changePassword(password) {
    var user = this.Firebase.auth().currentUser;
    return user.updatePassword(password)

  }

  getCurrentUser() {
    return this.$firebaseObject(this.userRef.child(this.AuthService.getUser().uid));
  }

  createUser(user) {
    var defer = this.$q.defer();
    // return this.$http.post(this.CM_DATABASE+'/signup', user)
    //TODO Known bug, when already logged, the user creation does not work as intended : can't disconnect the former user
    //thanks firebase for having outdated docs even though you wrote them two months ago
    this.Firebase.auth().signInAnonymously().then(function (firebaseUser) {
      console.log('firebaseUser', firebaseUser);
      this.userRef.child(firebaseUser.uid).set(user).then(function (ref) {
        // console.log('ref', ref);
        defer.resolve(firebaseUser.uid);
      }.bind(this), function (error) {
        console.log('error', error);
        defer.reject(error);
      })
    }.bind(this), function (error) {
      console.log('error', error);
      defer.reject(error);
    });
    return defer.promise;
  }

  getResult(uid, storyId) {
    return this.$firebaseArray(this.userRef.child(uid + '/walkthroughs/' + storyId));
  }

  saveResult(uid, storyID, index, answer) {
    this.userRef.child(uid + '/walkthroughs/' + storyID + '/' + index).set(answer);
  }

  isAdmin(uid) {
    var defer = this.$q.defer();
    this.Firebase.database().ref('admins').child(uid).once('value', function (data) {
      if (data.val()) {
        defer.resolve(true);
      } else {
        defer.reject('not admin');
      }
    }).catch(function (err) {
      console.log('err', err);
      defer.reject(err);
    });
    return defer.promise;
  }

  getUserGender() {
    let defer = this.$q.defer();
    this.userRef.child(this.AuthService.getUser().uid + '/gender/name').once('value', function (data) {
      defer.resolve(data.val() == "user-man"?"man":"woman");
    });

    return defer.promise;
  }


}
