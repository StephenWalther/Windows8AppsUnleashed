(function () {
    "use strict";

    function initialize() {

        var products = [
            { name: "Tesla", price: 300000 },
            { name: "BMW", price: 80000 },
            { name: "Pinto", price: 10000 }
        ];

        // Get the template and template container
        var tmplProduct = document.getElementById("tmplProduct");
        var conProducts = document.getElementById("conProducts");

        // Render each array item using the template
        WinJS.UI.processAll().done(function () {
            tmplProduct.winControl.render({}).then(function () {

                products.forEach(function (product) {
                    tmplProduct.winControl.render(product, conProducts);
                });

            });
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

