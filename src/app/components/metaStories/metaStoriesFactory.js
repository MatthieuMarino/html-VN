"use strict";

/**
 * @name StoriesFactory
 * @description Factory to get user objects from the firebase
 */
export class MetaStoriesFactory {
  constructor(Firebase, $firebaseArray, $firebaseObject) {
    'ngInject';

    this.Firebase = Firebase;
    this.metaStoriesRef = Firebase.database().ref('metaStories');
    this.$firebaseArray = $firebaseArray;
    this.$firebaseObject = $firebaseObject;
  }

  getMetaStory(id){
    return this.$firebaseObject(this.metaStoriesRef.child(id));
  }

  getMetaStories(){
    return this.$firebaseArray(this.metaStoriesRef);
  }

  deleteMetaStory(storyId){
    this.metaStoriesRef.child(storyId).remove();
  }

  createMetaStory(story){
    var newStory = angular.copy(story);
    return this.metaStoriesRef.push(newStory);
  }
}
