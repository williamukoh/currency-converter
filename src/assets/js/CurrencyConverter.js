;(function (exports) {
  'use strict';

  // Shortcuts to improve speed and size
  const originalGlobalValue = exports.CurrencyConverter;

  // Private methods
  const privateMethod = Symbol('privateMethod');

  class CurrencyConverter {

    constructor() {
  
    }
  
    init() {
      console.log("hello world")
    }

    [privateMethod] () {
      console.log( "Howdy!" );
    }

    publicMethod() {
      this[privateMethod]();
    }

    static noConflict() {
      exports.CurrencyConverter = originalGlobalValue;
      return this;
    }
  
    
  }

  // const proto = CurrencyConverter.prototype;


  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
      define(function () {
          return CurrencyConverter;
      });
  }
  else if (typeof module === 'object' && module.exports){
      module.exports = CurrencyConverter;
  }
  else {
      exports.CurrencyConverter = CurrencyConverter;
  }

})( typeof window !== "undefined" ? window : this || {} );


