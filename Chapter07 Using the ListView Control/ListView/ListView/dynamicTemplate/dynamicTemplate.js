(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20 },
                { name: "Cheese", price: 1.19, onSale: true },
                { name: "Milk", price: 2.33, onSale: true },
                { name: "Apples", price: 5.20 },
                { name: "Steak", price: 12.99 }
            ]);


            // Assign an item template function
            lvProducts.itemTemplate = function (itemPromise) {
                return itemPromise.then(function (item) {
                    // Select either normal product template or on sale template
                    var itemTemplate = document.getElementById("tmplProduct");
                    if (item.data.onSale) {
                        itemTemplate = document.getElementById("tmplProductOnSale");
                    };

                    // Render selected template to DIV container
                    var container = document.createElement("div");
                    itemTemplate.winControl.render(item.data, container);
                    return container;
                });
            };

            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
