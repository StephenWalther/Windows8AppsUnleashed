(function () {
    "use strict";

    function initialize() {
 
        var viewModel = {
            submit: WinJS.Utilities.markSupportedForProcessing(function (evt) {
                // Prevent page from being posted
                evt.preventDefault();

                // Grab form field values
                var productToAdd = {
                    name: document.getElementById("productName").value,
                    price: document.getElementById("productPrice").value
                };

                // TODO: Add new product to database
                console.log("Adding " + productToAdd.name + " to the database.");
            })
        };


        WinJS.Binding.processAll(null, viewModel);
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

