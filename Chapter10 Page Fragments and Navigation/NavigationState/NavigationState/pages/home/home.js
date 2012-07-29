(function () {
    "use strict";
    
    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            var lvCategories = document.getElementById("lvCategories").winControl;

            // Bind the categories to the ListView
            var dsCategories = new WinJS.Binding.List(MyApp.categoriesAndProducts);
            lvCategories.itemDataSource = dsCategories.dataSource;

            // Navigate when item selected
            lvCategories.addEventListener("selectionchanged", function () {
                if (lvCategories.selection.count() > 0) {
                    lvCategories.selection.getItems().done(function (items) {
                        // Get name of selected category
                        var selectedCategoryName = items[0].data.categoryName;

                        // Navigate
                        WinJS.Navigation.navigate(
                            "/pages/details/details.html",
                            { selectedCategoryName: selectedCategoryName }
                        );
                    });
                }
            });

        }
    });
})();
