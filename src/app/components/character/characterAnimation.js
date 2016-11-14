export function CharacterAnimation($animateCss) {
  'ngInject';

  return {
    enter: function(element) {
      // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.
      return $animateCss(element, {
        event: 'enter',
        structural: true
      });
    }
  }

}
