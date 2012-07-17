(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {

            var togFlux = document.getElementById("togFlux").winControl;
            var divMessage = document.getElementById("divMessage");

            togFlux.addEventListener("change", function (evt) {
                if (togFlux.checked) {
                    divMessage.innerHTML = "Flux Capacitor activated!";
                } else {
                    divMessage.innerHTML = "Flux Capacitor de-activated.";
                };
            })

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
