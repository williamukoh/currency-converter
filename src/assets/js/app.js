/* requires: CurrencyConverter.js */

// private methods
class App {

    constructor($converter = null) {

        this.c1Field = this.id("c1Field");
        this.c2Field = this.id("c2Field");
        this.amountField = this.id("amount");
        this.convertBtn = this.id("convertBtn");

        this.tab1Btn = this.id("tab1Btn");
        this.tab2Btn = this.id("tab2Btn");

        this.tab1 = this.id("tab1");
        this.tab2 = this.id("tab2");

        this.converter = $converter;

        this.enableTabs = true;
        this.notification = this.id("notification");

    }

    id($idname = "") {
        return (typeof $idname !== "string" || !$idname.length) ? null : document.getElementById($idname);
    }

    init() {

        document.documentElement.classList.toggle("no-js");
        document.documentElement.classList.add("js");

        const whichTransitionEvent = () => {
            var t,
                el = document.createElement("fakeelement");

            var transitions = {
                "transition": "transitionend",
                "OTransition": "oTransitionEnd",
                "MozTransition": "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            }

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

        let _preloader = document.querySelector(".preloader-wrapper");

        _preloader.addEventListener(whichTransitionEvent(), () => {
            _preloader.parentNode.removeChild(_preloader);
        });

        window.onresize = () => {

            let _nav = document.querySelector(".navbar-menu");

            if (getComputedStyle(_nav).display == "none")
                _nav.setAttribute("data-hidden", "true");
            else
                _nav.setAttribute("data-hidden", "false");

        };

        document.querySelector(".navbar-burger").addEventListener("click", ($evt) => {

            let _nav = document.querySelector(".navbar-menu");

            if (_nav.getAttribute("data-hidden") == "true") {
                _nav.style.display = "block";
                _nav.setAttribute("data-hidden", "false");
            } else {
                _nav.style.display = "none";
                _nav.setAttribute("data-hidden", "true");
            }

        });

        this.initUI();
        this.loadCurrency();

        return this;
    }

    initUI() {

        // Tabs
        this.tab2.style.display = "none";

        this.tab1Btn.addEventListener("click", () => {
            if (!this.enableTabs)
                return;
            this.tab1.style.display = "block";
            this.tab2.style.display = "none";

            this.tab1Btn.parentNode.classList.toggle("is-active");
            this.tab2Btn.parentNode.classList.toggle("is-active");
        });

        this.tab2Btn.addEventListener("click", () => {
            if (!this.enableTabs)
                return;
            this.tab1.style.display = "none";
            this.tab2.style.display = "block";

            this.tab1Btn.parentNode.classList.toggle("is-active");
            this.tab2Btn.parentNode.classList.toggle("is-active");
        });

        // buttons
        this.convertBtn.addEventListener("click", () => {
            if (!this.convertBtn.getAttribute("disabled") != "")
                this.convertCurrency();
        });

        document.documentElement.addEventListener("click", ($evt) => {

            if ($evt.target == document.querySelector("button.delete")) {
                $evt.target.parentNode.style.display = "none";
            }

        });

        window.onload = ($evt) => {
            // return;
            let _nav = document.querySelector(".navbar-menu");

            if (getComputedStyle(_nav).display == "none")
                _nav.setAttribute("data-hidden", "true");
            else
                _nav.setAttribute("data-hidden", "false");

            document.querySelector(".preloader-wrapper").classList.add("hide");
        }

    }

    loadCurrency() {

        this.enableTabs = false;
        // this.convertBtn.classList.toggle("is-loading");
        this.convertBtn.setAttribute("disabled", "disabled");

        const getData = async() => {

            try {
                const _data = await this.converter.getCurrencies();

                for (const [key, value] of Object.entries(_data.results)) {
                    this.c1Field.options.add(new Option(value.currencyName, key));
                    this.c2Field.options.add(new Option(value.currencyName, key));
                }

                this.convertBtn.removeAttribute("disabled");

            } catch ($error) {
                this.toggleNotification(true, $error, "is-danger");
            }

            this.enableTabs = true;

        }

        getData();

    }

    async convertCurrency() {

        this.toggleNotification(0);

        if ( !this.formIsValid() ) {
            this.toggleNotification(1, "Select your desired currency", "is-warning");
        }

        try {
          const _amount = this.amountField.value;
          const _from = this.c1Field.options[this.c1Field.selectedIndex].value;
          const _to = this.c2Field.options[this.c2Field.selectedIndex].value;

          this.enableTabs = false;
          this.convertBtn.setAttribute("disabled","disabled");

          const _result = await this.converter.convert( _amount, _from, _to );
          console.log( _result );

        } catch( $error ) {
          this.toggleNotification( 1,`Error converting from ${_from} to ${_to} [${$error}]` );
        }

        this.enableTabs = true;
        this.convertBtn.removeAttribute("disabled");
    }

    formIsValid() {
        return !(this.c1Field.options[this.c1Field.selectedIndex].value === "" || this.c2Field.options[this.c2Field.selectedIndex].value === "" || this.amountField.value === "" );
    }

    toggleNotification($visible = false, $message = "", $alert = "is-danger", $handler = null) {

        if (!$visible) {
            this.notification.style.display = "none";
            return;
        }

        // remove "is-*"
        let classNames = this.notification.className;
        classNames = classNames.split(" ").find($className => $className.startsWith("is"));
        this.notification.classList.remove(classNames);

        // set message and display
        this.notification.querySelector(":scope div").innerHTML = $message;
        this.notification.classList.toggle($alert);
        this.notification.style.display = "block";

    }

}

// DOM Loaded
const ready = (fn) => {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}


ready(() => window.thisApp = new App(new CurrencyConverter()).init());