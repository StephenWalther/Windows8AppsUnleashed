(function () {
    "use strict";

    function initialize() {

        var strict = WinJS.Utilities.strictProcessing;

        var viewModel = {
            product1: {
                name: "Tesla",
                price: 300000.00,
                onSale: false
            },
            product2: {
                name: "BMW",
                price: 80000.00,
                onSale: true
            }
        };


        WinJS.Binding.processAll(null, viewModel);
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

