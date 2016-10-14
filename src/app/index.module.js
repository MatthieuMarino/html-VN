/* global firebase:false*/

import { config } from './index.config';
import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';
import { AuthServiceProvider } from './auth/auth.provider';
import { LoginController } from './login/login.controller';
import { UserFactory } from './components/users/userFactory';
import { SignupPageController } from './signup/signup.controller';
import { NavbarDirective } from './components/navbar/navbarDirective';
import { CharacterDirective } from './components/character/characterDirective';
import { InterfaceDirective } from './components/interface/interfaceDirective';
import { StoryController } from './story/storyController';
import { ResultController } from './result/result.controller';

angular.module('dyouVn', ['ngAnimate', 'ngSanitize', 'ngAria', 'ngRoute', 'firebase'])
  .constant('Firebase',firebase)
  .config(config)
  .config(routerConfig)
  .provider('AuthService', AuthServiceProvider)
  .service('UserFactory', UserFactory)
  .controller('MainController', MainController)
  .controller('Login',LoginController)
  .controller('Signup', SignupPageController)
  .controller('Story', StoryController)
  .controller('Result', ResultController)
  .directive('navbar', NavbarDirective)
  .directive('character', CharacterDirective)
  .directive('interface', InterfaceDirective)
;
