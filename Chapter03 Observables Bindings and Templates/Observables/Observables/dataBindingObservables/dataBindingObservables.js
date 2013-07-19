(function () {
    "use strict";

    function initialize() {

        // Create a view model
        var viewModel = {
            timesClicked: 0,
            click: WinJS.Utilities.markSupportedForProcessing(function (evt) {
                evt.preventDefault();
                viewModel.timesClicked ++;
            })
        };

        // Make the view model observable
        viewModel = WinJS.Binding.as(viewModel);
        

        // Bind the view model to the document
        WinJS.Binding.processAll(null, viewModel);
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

