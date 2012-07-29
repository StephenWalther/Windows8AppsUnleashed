// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/details/details.html", {
        ready: function (element, options) {
            var lvProducts = document.getElementById("lvProducts");

            // Get select category
            var selectedCategoryName = options.selectedCategoryName;

            // Filter products by category
            var selectedCategory = MyApp.categoriesAndProducts.filter(function (category) {
                return category.categoryName == selectedCategoryName;
            });

            // Bind products to ListView
            var dsProducts = new WinJS.Binding.List(selectedCategory[0].products);
            //lvProducts.itemDataSource = dsProducts.dataSource;

            lvProducts.itemDataSource = new WinJS.Binding.List([{ productName: "bob" }]);
        }

    });
})();
