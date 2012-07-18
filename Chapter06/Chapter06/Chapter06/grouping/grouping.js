(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                        { name: "Milk", price: 2.44, category: "Beverages" },
                        { name: "Oranges", price: 1.99, category: "Fruit" },
                        { name: "Wine", price: 8.55, category: "Beverages" },
                        { name: "Apples", price: 2.44, category: "Fruit" },
                        { name: "Steak", price: 1.99, category: "Other" },
                        { name: "Eggs", price: 2.44, category: "Other" },
                        { name: "Mushrooms", price: 1.99, category: "Other" },
                        { name: "Yogurt", price: 2.44, category: "Other" },
                        { name: "Soup", price: 1.99, category: "Other" },
                        { name: "Cereal", price: 2.44, category: "Other" },
                        { name: "Pepsi", price: 1.99, category: "Beverages" }
            ]);

            // Create grouped data source
            var groupListProducts = listProducts.createGrouped(
                function (dataItem) {
                    return dataItem.category;
                },
                function (dataItem) {
                    return { title: dataItem.category };
                },
                function (group1, group2) {
                    return group1 > group2 ? 1 : -1;
                }
            );

            // Bind the list of products to the ListView
            lvProducts.groupDataSource = groupListProducts.groups.dataSource;
            lvProducts.itemDataSource = groupListProducts.dataSource;

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
