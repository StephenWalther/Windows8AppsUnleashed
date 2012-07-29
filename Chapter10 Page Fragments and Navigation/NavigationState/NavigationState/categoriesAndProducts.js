(function () {
    "use strict";

    var categoriesAndProducts = [
        {
            categoryName: "Beverages",
            products: [
                { productName: "Pepsi", price: 3.99 },
                { productName: "Moxie", price: 17.88 }
            ]
        },
        {
            categoryName: "Fruit",
            products: [
                { productName: "Apples", price: 1.27 },
                { productName: "Oranges", price: 4.55 },
                { productName: "Grapes", price: 3.01 }
            ]
        },
        {
            categoryName: "Meat",
            products: [
                { productName: "Steak", price: 12.27 },
                { productName: "Lobster", price: 42.55 },
                { productName: "Rabbit", price: 13.01 }
            ]
        }
    ];


    WinJS.Namespace.define("MyApp", {
        categoriesAndProducts: categoriesAndProducts
    });

})();
