;(function (exports) {
  'use strict';

  // Shortcuts to improve speed and size
  const originalGlobalValue = exports.CurrencyConverter;

  // Private methods
  const privateMethod = Symbol('privateMethod');

  class CurrencyConverter {

    constructor() {
      this.API_ENDPOINT = "https://free.currencyconverterapi.com/api/v5";
    }
  
    init() {
      
    }

    [privateMethod] () {
      console.log( "private" );
    }

    getCurrencies() {

      return new Promise( (resolves, rejects) => {
        
        fetch( `${this.API_ENDPOINT}/currencies` ).then( ($result) => {
          $result.json().then( ($data) => {
            resolves($data);
          })
        }).catch( ($error) => {
          rejects( `Failed to load currencies from remote API [${$error}]` );
        })
        
      });
    }

    convert( $amount=0, $fromCurrency="", $toCurrency="" ) {

      if( !$amount || !$fromCurrency || !$toCurrency ) 
        return Promise.reject( "Specify amount and currencies" );

      return new Promise( ( $resolves, $rejects ) => {

        fetch( `${this.API_ENDPOINT}/convert?q=${$fromCurrency}_${$toCurrency}&compact=y` ).then( ($result) => {
          $result.json().then( ($data) => {
            $resolves($data);
          });
        })

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


