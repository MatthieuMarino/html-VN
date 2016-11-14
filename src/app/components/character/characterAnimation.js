export function CharacterAnimation($animateCss) {
  'ngInject';

  var animation = function(element, className) {

    console.log('element', element);
    console.log('added class ', className );
    let target = 0;
    let initial = -400;
    let duration = 3;
    switch (className){
      case 'slide slide1':
        target = 0;
        duration = 1;
        break;
      case 'slide slide2':
        target = 87.5;
        duration = 1.2;
        break;
      case 'slide slide3':
        target = 175;
        duration = 2;
        break;
      case 'slide slide4':
        target = 262.5;
        duration = 2.3;
        break;
      case 'slide slide5':
        target = 350;
        duration = 2.7;
        break;
      case 'slide slide6':
        target = 437.5;
        initial = 1500;
        duration = 3;
        break;
      case 'slide slide7':
        target = 525;
        initial = 1500;
        duration = 2.4;
        break;
      case 'slide slide8':
        target = 612.5;
        initial = 1500;
        duration = 2.7;
        break;
    }
    console.log('target', target);
    return $animateCss(element, {
      duration: duration,
      from: { left:initial },
      to: { left: target }
    });
  };

  return {
    addClass: animation,
    removeClass: function(elem, className){
      console.log('removeClass');
      console.log('className', className);
    },
    setClass: function(){
      console.log('setClass');
    },
    enter: function(elem){
      console.log('enter');
      console.log('elem', elem);
    },
    leave: function(elem){
      console.log('leave');
      console.log('elem', elem);
    },
    move: function(){
      console.log('move');
    }
  }

}
