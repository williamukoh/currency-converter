!function(e){"use strict";const o=e.CurrencyConverter,t=Symbol("privateMethod");class n{constructor(){}init(){console.log("hello world")}[t](){console.log("Howdy!")}publicMethod(){this[t]()}static noConflict(){return e.CurrencyConverter=o,this}}"function"==typeof define&&define.amd?define(function(){return n}):"object"==typeof module&&module.exports?module.exports=n:e.CurrencyConverter=n}("undefined"!=typeof window?window:this||{});
const ready=t=>{"loading"!=document.readyState?t():document.addEventListener("DOMContentLoaded",t)};class App{constructor(){this.c1Field=this.id("c1Field"),this.c2Field=this.id("c2Field"),this.amountField=this.id("amount"),this.convertBtn=this.id("convertBtn"),this.tab1Btn=this.id("tab1Btn"),this.tab2Btn=this.id("tab2Btn"),this.tab1=this.id("tab1"),this.tab2=this.id("tab2"),this.enableTabs=!0}id(t=""){return"string"==typeof t&&t.length?document.getElementById(t):null}init(){this.tab2.style.display="none",this.tab1Btn.addEventListener("click",()=>{this.enableTabs&&(this.tab1.style.display="block",this.tab2.style.display="none",this.tab1Btn.parentNode.classList.toggle("is-active"),this.tab2Btn.parentNode.classList.toggle("is-active"))}),this.tab2Btn.addEventListener("click",()=>{this.enableTabs&&(this.tab1.style.display="none",this.tab2.style.display="block",this.tab1Btn.parentNode.classList.toggle("is-active"),this.tab2Btn.parentNode.classList.toggle("is-active"))})}}ready(()=>{document.documentElement.classList.toggle("no-js"),document.documentElement.classList.add("js");let t=document.querySelector(".preloader-wrapper");t.addEventListener((()=>{var t,e=document.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in i)if(void 0!==e.style[t])return i[t]})(),()=>{t.parentNode.removeChild(t)}),window.onresize=(()=>{let t=document.querySelector(".navbar-menu");"none"==getComputedStyle(t).display?t.setAttribute("data-hidden","true"):t.setAttribute("data-hidden","false")}),document.querySelector(".navbar-burger").addEventListener("click",t=>{let e=document.querySelector(".navbar-menu");"true"==e.getAttribute("data-hidden")?(e.style.display="block",e.setAttribute("data-hidden","false")):(e.style.display="none",e.setAttribute("data-hidden","true"))}),window.thisApp=new App,thisApp.init(),(new CurrencyConverter).init()}),window.onload=(t=>{let e=document.querySelector(".navbar-menu");"none"==getComputedStyle(e).display?e.setAttribute("data-hidden","true"):e.setAttribute("data-hidden","false"),document.querySelector(".preloader-wrapper").classList.add("hide")});
//# sourceMappingURL=build.js.map
