"use strict";

/**
 * @name StoriesFactory
 * @description Factory to get user objects from the firebase
 */
export class StoriesFactory {
  constructor(Firebase, $firebaseArray, $firebaseObject) {
    'ngInject';

    this.Firebase = Firebase;
    this.storiesRef = Firebase.database().ref('stories');
    this.$firebaseArray = $firebaseArray;
    this.$firebaseObject = $firebaseObject;
  }

  getStory(id){
    return this.$firebaseObject(this.storiesRef.child(id));
  }
}
