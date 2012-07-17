(function () {
    "use strict";

    function initialize() {

        var products = [
            { name: "Tesla", price: 300000 },
            { name: "BMW", price: 80000 },
            { name: "Pinto", price: 10000 }
        ];

        WinJS.UI.processAll().done(function () {
            var tmplProduct = document.getElementById("tmplProduct");
            WinJS.Utilities.id("conProducts").template(tmplProduct, products);
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

