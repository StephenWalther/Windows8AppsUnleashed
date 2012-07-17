(function () {
    "use strict";

    function initialize() {

        // Create a view model
        var viewModel = {
            averageRating: 3
        };

        // Bind the view model to the document
        WinJS.UI.processAll()
            .done(function () {
                WinJS.Binding.processAll(null, viewModel);
            });
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

