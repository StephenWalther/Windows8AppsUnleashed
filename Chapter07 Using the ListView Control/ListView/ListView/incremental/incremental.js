(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create an array of products
            var products = [];
            for (var i = 0; i < 10000; i++) {
                products.push({
                    name: "Product " + i,
                    price: Math.floor((Math.random()*5000)+1)
                });
            }

            // Create a List of products
            var listProducts = new WinJS.Binding.List(products);

            // Enable incremental loading
            lvProducts.loadingBehavior = "incremental";
            lvProducts.automaticallyLoadPages = true; 
            lvProducts.pagesToLoad = 5;

            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;


            // Create a handler for loading pages manually
            document.getElementById("btnLoad").addEventListener("click", function () {
                lvProducts.loadMorePages();
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
