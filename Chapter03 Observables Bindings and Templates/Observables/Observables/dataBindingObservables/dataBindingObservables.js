(function () {
    "use strict";

    function initialize() {

        // Create a view model
        var viewModel = {
            timesClicked: 0
        };

        // Make the view model observable
        viewModel = WinJS.Binding.as(viewModel);

        // Bind the view model to the document
        WinJS.Binding.processAll(null, viewModel);

        document.getElementById("updateTimesClicked").addEventListener(
          "click",
          function (evt) {
              evt.preventDefault();
              viewModel.timesClicked++;
          });
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();

