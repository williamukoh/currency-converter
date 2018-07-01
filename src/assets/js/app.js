/* requires: CurrencyConverter.js */
const ready = (fn) => {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  

  // private methods
class App {

  constructor() {

    this.c1Field = this.id("c1Field");
    this.c2Field = this.id("c2Field");
    this.amountField = this.id("amount"); 
    this.convertBtn = this.id("convertBtn");

    this.tab1Btn = this.id("tab1Btn");
    this.tab2Btn = this.id("tab2Btn");

    this.tab1 = this.id("tab1");
    this.tab2 = this.id("tab2");

    this.enableTabs = true;

  }

  id( $idname = "" ){
    return ( typeof $idname !== "string" || !$idname.length ) ? null : document.getElementById($idname);
  }

  init() {
    
    this.tab2.style.display = "none";

    this.tab1Btn.addEventListener("click", () => {
      if( !this.enableTabs )
        return;
      this.tab1.style.display = "block";
      this.tab2.style.display = "none";

      this.tab1Btn.parentNode.classList.toggle("is-active");
      this.tab2Btn.parentNode.classList.toggle("is-active");
    });

    this.tab2Btn.addEventListener("click", () => {
      if( !this.enableTabs )
        return;
      this.tab1.style.display = "none";
      this.tab2.style.display = "block";

      this.tab1Btn.parentNode.classList.toggle("is-active");
      this.tab2Btn.parentNode.classList.toggle("is-active");
    });
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

  let _preloader = document.querySelector(".preloader-wrapper");
  _preloader.addEventListener( whichTransitionEvent(), () => { 
    _preloader.parentNode.removeChild(_preloader);
  });

  window.onresize = () => {

    let _nav = document.querySelector(".navbar-menu");

    if( getComputedStyle(_nav).display == "none" ) 
      _nav.setAttribute( "data-hidden", "true" );
    else
      _nav.setAttribute( "data-hidden", "false" );

  };

  document.querySelector(".navbar-burger").addEventListener("click", ($e) => {

    let _nav = document.querySelector(".navbar-menu");
    
    if( _nav.getAttribute("data-hidden") == "true" ){
      _nav.style.display = "block";
      _nav.setAttribute( "data-hidden", "false" );
    }else {
      _nav.style.display = "none";
      _nav.setAttribute( "data-hidden", "true" );
    }

  })

  window.thisApp = new App();
  thisApp.init();

  new CurrencyConverter().init();

});

window.onload = ( e ) =>  {
  let _nav = document.querySelector(".navbar-menu");

  if( getComputedStyle(_nav).display == "none" ) 
    _nav.setAttribute( "data-hidden", "true" );
  else
    _nav.setAttribute( "data-hidden", "false" );

  document.querySelector(".preloader-wrapper").classList.add( "hide" );  
} 