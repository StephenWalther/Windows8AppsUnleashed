(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "BBBBBBBB", price: 2.20 },
                { name: "AA", price: 1.19 },
                { name: "CC", price: 2.33 },
                { name: "DD", price: 5.20 },
                { name: "EE", price: 1.19 },
                { name: "FF", price: 2.33 },
                { name: "GG", price: 5.20 }

            ]);

            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
