(function () {
    "use strict";

    function initialize() {

        var products = [
            { name: "Tesla", price: 300000},
            { name: "BMW", price: 80000 },
            { name: "Pinto", price: 10000 }
        ];

        // Get the template and template container
        var tmplProduct = document.getElementById("tmplProduct");
        var conProducts = document.getElementById("conProducts");

        // Create the template
        var template = new WinJS.Binding.Template(tmplProduct)

        // Render each array item using the template
        products.forEach(function(product) {
            template.render(product, conProducts);
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

