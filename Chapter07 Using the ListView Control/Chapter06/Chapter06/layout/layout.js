(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;
            var selectLayout = document.getElementById("selectLayout");

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20 },
                { name: "Cheese", price: 1.19 },
                { name: "Milk", price: 2.33 },
                { name: "Apples", price: 5.20 },
                { name: "Steak", price: 12.99 },
                { name: "Oranges", price: 2.20 },
                { name: "Carrots", price: 1.19 },
                { name: "Yogurt", price: 2.33 },
                { name: "Eggs", price: 5.20 },
                { name: "Soda", price: 12.99 },
                { name: "Steak", price: 12.99 },
                { name: "Oranges", price: 2.20 },
                { name: "Carrots", price: 1.19 },
                { name: "Yogurt", price: 2.33 },
                { name: "Eggs", price: 5.20 },
                { name: "Soda", price: 12.99 }

            ]);

            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

            // Add handler for selecting layout
            selectLayout.addEventListener("change", function () {
                if (selectLayout.value === "Grid Layout") {
                    lvProducts.layout = new WinJS.UI.GridLayout();
                } else {
                    lvProducts.layout = new WinJS.UI.ListLayout();
                }
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
