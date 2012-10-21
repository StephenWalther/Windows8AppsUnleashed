(function () {
    "use strict";

    // Create a List of products
    var listProducts = new WinJS.Binding.List([
        { name: "Bread", price: 2.20 },
        { name: "Brocolli", price: 1.19 },
        { name: "Bananas", price: 2.33 },
        { name: "Apples", price: 5.20 },
        { name: "Apple Sauce", price: 12.99 }
    ]);

    function initialize() {

        WinJS.UI.processAll().done(function () {
            // Get references to DOM elements and Controls
            var lvProducts = document.getElementById("lvProducts").winControl;
            var inputFilter = document.getElementById("inputFilter");

            // Bind the unfiltered list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

            inputFilter.addEventListener("keyup", function () {
                // Filter the data source
                var filteredListProducts = listProducts.createFiltered(function (item) {
                    return item.name.toLowerCase().indexOf(inputFilter.value) == 0;
                });

                // Bind the list of products to the ListView
                lvProducts.itemDataSource = filteredListProducts.dataSource;
            });
        
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
