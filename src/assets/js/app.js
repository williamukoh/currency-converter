/* requires: CurrencyConverter.js */
const ready = (fn) => {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  

ready( () =>  {

  document.documentElement.classList.toggle( "no-js" );
  document.documentElement.classList.add( "js" );

  const whichTransitionEvent = () => {
    var t,
        el = document.createElement("fakeelement");
  
    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }
  
    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }

  const _preloader = document.querySelector(".preloader-wrapper");
  _preloader.addEventListener( whichTransitionEvent(), () => { 
    this.parentNode.removeChild(this); 
  });
  _preloader.classList.add( "hide" );

  new CurrencyConverter().init() 

});