(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create List of products
            var listProducts = new WinJS.Binding.List([
                {name: "Bread", price: 2.99},
                {name: "Eggs", price: 1.99},
                {name: "Milk", price: 4.99},
                {name: "Cheese", price: 8.99},
                { name: "Apples", price: 1.99 },
                { name: "Steak", price: 12.99 }
            ]);

            // Bind List to ListView
            lvProducts.itemDataSource = listProducts.dataSource;
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
