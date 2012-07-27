(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get references to DOM elements
            var lvProducts = document.getElementById("lvProducts").winControl;
      
// Create a List of products
var listProducts = new WinJS.Binding.List([
    { name: "Bread", price: 2.20 },
    { name: "Cheese", price: 1.19 },
    { name: "Milk", price: 2.33 },
    { name: "Maple Syrup", price: 2.33 },
    { name: "Apples", price: 5.20 },
    { name: "Steak", price: 12.99 }
]);

// Sort the products
var sortedListProducts = listProducts.createSorted(function (item1, item2) {
    return item1.name > item2.name ? 1 : -1;
});

// Bind the list of products to the ListView
lvProducts.itemDataSource = sortedListProducts.dataSource;

            listProducts.push({ name: "Mystery Meat", price: 99 });
        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
