/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/details/details.html", {
        ready: function (element, options) {
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Get selected category
            var selectedCategoryName = options.selectedCategoryName;

            // Filter products by category
            var selectedCategory = MyApp.categoriesAndProducts.filter(function (category) {
                return category.categoryName == selectedCategoryName;
            });

            // Bind products to ListView
            var dsProducts = new WinJS.Binding.List(selectedCategory[0].products);
            lvProducts.itemDataSource = dsProducts.dataSource;
        }

    });
})();
