"use strict";


export class ResourcesFactory {

  constructor(Firebase, $firebaseArray, $firebaseObject) {
    'ngInject';

    this.Firebase = Firebase;
    this.charactersRef = Firebase.database().ref('characters');
    this.backgroundsRef = Firebase.database().ref('backgrounds');
    this.$firebaseArray = $firebaseArray;
    this.$firebaseObject = $firebaseObject;
  }

  getCharacters(){
    // console.log(this.charactersRef);
    return this.$firebaseArray(this.charactersRef);
  }

  getCharacter(name){
    // console.log(this.charactersRef);
    return this.$firebaseArray(this.charactersRef.child(name));
  }

}
