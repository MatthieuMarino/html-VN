"use strict";

export class FileUploader {
  constructor($q, Firebase) {
    'ngInject';

    var ref = Firebase.storage().ref();

    var uploadFile = function (pic, type, bind) {
      let defer = $q.defer();
      let name = new Date().getTime();
      var uploadTask = ref.child(type+'/' + name).put(pic);
      if (pic.size <= 52428800) {
        uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
          function (snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + progress + '% done');
            if (snapshot.state == firebase.storage.TaskState.PAUSED) {
              console.log('Upload is paused');
            }
            else if (snapshot.state == firebase.storage.TaskState.RUNNING) {
              console.log('Upload is running');
            }
            if (bind) {
              bind.progressBar = Math.floor(progress);
            }

          }, function (error) {
            console.warn(error);
            if (bind) {
              bind.progressBar = false;
            }
            defer.reject(error);
          }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            if (bind) {
              bind.progressBar = false;
            }
            defer.resolve(downloadURL);
          });
      } else {
        defer.reject('Le fichier est trop gros : 50 Mo Maximum');
      }

      return defer.promise;
    };

    var saveBackground = function(background, url){
      Firebase.database().ref('backgrounds/'+background).set(url);
    };

    var saveCharacter = function(character){
      console.log(character);
      Firebase.database().ref('characters/'+character.name).set(character);
    };

    return {
      uploadFile,
      saveBackground,
      saveCharacter
    }

  }
}
