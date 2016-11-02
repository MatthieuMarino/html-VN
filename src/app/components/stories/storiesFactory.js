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

  getStories(){
    return this.$firebaseArray(this.storiesRef);
  }

  deleteStory(storyId){
    this.storiesRef.child(storyId).remove();
  }

  createStory(story){
    var newStory = angular.copy(story);
    return this.Firebase.database().ref('stories').push(newStory);
  }

  getBackgrounds(){
    return this.$firebaseObject(this.Firebase.database().ref('backgrounds'));
  }

  getCharacters(){
    return this.$firebaseArray(this.Firebase.database().ref('characters'));
  }

  getCharacter(id){
    return this.$firebaseObject(this.Firebase.database().ref('characters/'+id));
  }

  getFlavour(id){
    return this.$firebaseObject(this.Firebase.database().ref('flavours/'+id));
  }

  getFlavours(){
    return this.$firebaseArray(this.Firebase.database().ref('flavours/'));
  }

  createFlavour(flavour){
    return this.Firebase.database().ref('flavours').push(flavour);
  }
}
