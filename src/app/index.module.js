/* global firebase:false*/

import { config } from './index.config';
import { routerConfig } from './index.route';
import { AuthServiceProvider } from './auth/auth.provider';
import { NavbarDirective } from './components/navbar/navbarDirective';
import { CharacterDirective } from './components/character/characterDirective';
import { InterfaceDirective } from './components/interface/interfaceDirective';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { SignupPageController } from './signup/signup.controller';
import { StoryController } from './story/storyController';
import { StoryCreateController } from './story/create/storyCreateController';
import { ResultController } from './result/result.controller';
import { ResourcesController } from './resources/resourcesController';
import { StoriesController } from './story/list/storiesController';
import { StoryEditController } from './story/edit/storyEditController';
import { FileUploader } from './components/uploader/fileUploader';
import { UserFactory } from './components/users/userFactory';
import { StoriesFactory } from './components/stories/storiesFactory';
import { ResourcesFactory } from './resources/resources.service';

angular.module('dyouVn', ['ngAnimate', 'ngSanitize', 'ngAria', 'ngRoute', 'firebase', 'ngFileUpload'])
  .constant('Firebase',firebase)
  .config(config)
  .config(routerConfig)
  .provider('AuthService', AuthServiceProvider)
  .service('UserFactory', UserFactory)
  .service('StoriesFactory', StoriesFactory)
  .service('FileUploader', FileUploader)
  .service('ResourcesFactory', ResourcesFactory)
  .controller('MainController', MainController)
  .controller('Login',LoginController)
  .controller('Signup', SignupPageController)
  .controller('Story', StoryController)
  .controller('StoryCreate', StoryCreateController)
  .controller('Result', ResultController)
  .controller('Stories', StoriesController)
  .controller('StoryEdit', StoryEditController)
  .controller('Resources', ResourcesController)
  .directive('navbar', NavbarDirective)
  .directive('character', CharacterDirective)
  .directive('interface', InterfaceDirective)
;
