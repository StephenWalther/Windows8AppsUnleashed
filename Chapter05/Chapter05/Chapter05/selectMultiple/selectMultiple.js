(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get references to ListView controls
            var lvProducts = document.getElementById("lvProducts").winControl;
            var lvShoppingCart = document.getElementById("lvShoppingCart").winControl;

            // Create List of products
            var listProducts = new WinJS.Binding.List([
                { productName: "Bread", price: 2.20 },
                { productName: "Cheese", price: 1.19 },
                { productName: "Milk", price: 2.33 },
                { productName: "Apples", price: 5.20 },
                { productName: "Steak", price: 12.99 }
            ]);

            // Bind the list to the Products ListView
            lvProducts.itemDataSource = listProducts.dataSource;

            // Handle the selectionchanged event
            lvProducts.addEventListener("selectionchanged", function () {
                lvProducts.selection.getItems().done(function (items) {
                    // Copy selected items into new array
                    var selectedProducts = [];
                    items.forEach(function (item) {
                        selectedProducts.push(item.data);
                    });

                    // Convert selected products into List
                    var listProducts = new WinJS.Binding.List(selectedProducts);
                        
                    // Bind the list to the shopping cart
                    lvShoppingCart.itemDataSource = listProducts.dataSource;
                });
            });


        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
