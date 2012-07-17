(function () {
    "use strict";

    function initialize() {
        var product = {
            name: "Tesla Roadster",
            price: 34,
            photo: "tesla.jpg"
        };

        WinJS.Binding.processAll(null, product);
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

