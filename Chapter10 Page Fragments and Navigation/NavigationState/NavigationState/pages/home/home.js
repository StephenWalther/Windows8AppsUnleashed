(function () {
    "use strict";
    
    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            var lvCategories = document.getElementById("lvCategories").winControl;

            // Bind the categories to the ListView
            var dsCategories = new WinJS.Binding.List(MyApp.categoriesAndProducts);
            lvCategories.itemDataSource = dsCategories.dataSource;
           
            // Retrieve selected category index from state
            WinJS.Navigation.state = WinJS.Navigation.state || {};
            var selectedCategoryIndex = WinJS.Navigation.state.selectedCategoryIndex;
            if (selectedCategoryIndex > -1) {
                lvCategories.selection.set(selectedCategoryIndex);
            }

            // Navigate when item selected
            lvCategories.addEventListener("selectionchanged", function () {
                if (lvCategories.selection.count() > 0) {
                    lvCategories.selection.getItems().done(function (items) {
                        // Store index of selected category in history
                        var selectedCategoryIndex = items[0].index;
                        WinJS.Navigation.state = { selectedCategoryIndex: selectedCategoryIndex };

                        // Navigate with selected category name
                        var selectedCategoryName = items[0].data.categoryName;
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
