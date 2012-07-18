(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get references to ListView controls
            var lvProducts = document.getElementById("lvProducts").winControl;
            var lvCategories = document.getElementById("lvCategories").winControl;

            // Create array of categories and products
            var products = [
                {
                    categoryName: "Beverages",
                    products: [
                        { productName: "Pepsi", price: 4.00 },
                        { productName: "Milk", price: 2.11 },
                        { productName: "Moxie", price: 1.33 }
                    ]
                },
                {
                    categoryName: "Meat",
                    products: [
                        { productName: "Steak", price: 34.33 },
                        { productName: "Chicken", price: 2.01 }
                    ]
                },
                {
                    categoryName: "Fruit",
                    products: [
                        { productName: "Apples", price: 2.88 },
                        { productName: "Oranges", price: 7.01 }
                    ]
                }
            ];

            // Create a List of categories and products
            var listProducts = new WinJS.Binding.List(products);

            // Bind the list to the Categories ListView
            lvCategories.itemDataSource = listProducts.dataSource;

            // Handle the selectionchanged event
            lvCategories.addEventListener("selectionchanged", function () {
                if (lvCategories.selection.count() > 0) {
                    lvCategories.selection.getItems().done(function (items) {
                        // Get products for first selected item
                        var selectedProducts = items[0].data.products;

                        // Convert to list
                        var listSelectedProducts = new WinJS.Binding.List(selectedProducts);

                        // Bind to Products ListView
                        lvProducts.itemDataSource = listSelectedProducts.dataSource;
                    });
                }
            });


        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
