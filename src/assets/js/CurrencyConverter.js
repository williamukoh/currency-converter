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
      
    }

    [privateMethod] () {
      console.log( "private" );
    }

    getCurrencies() {

      return new Promise( (resolves, rejects) => {
        
        fetch( "https://free.currencyconverterapi.com/api/v5/currencies" ).then( ($result) => {
          $result.json().then( ($data) => {
            resolves($data);
          })
        }).catch( ($error) => {
          rejects( `Failed to load currencies from remote API [${$error}]` );
        })
        
      });
    }

    convert( $amount=0, $fromCurrency="", $toCurrency="" ) {
      return new Promise( ( $resolves, $rejects ) => {

        setTimeout( () => $resolves("data loaded"), 3000 );

      })
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


