(function () {
    "use strict";

    function initialize() {

        var strict = WinJS.Utilities.strictProcessing;

        var viewModel = {
            product1: {
                name: "Tesla",
                price: 99.999999,
                dateAvailable: new Date("12/25/2012")
            }
        };


        WinJS.Binding.processAll(null, viewModel);
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

