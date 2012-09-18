(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var fvArticles = document.getElementById("fvArticles").winControl;
            var divPageNumber = document.getElementById("divPageNumber");

            // Show Page Number and Page Count
            function updatePageNumber() {
                var currentPage = fvArticles.currentPage + 1;
                fvArticles.count().done(function (count) {
                    divPageNumber.innerHTML = "Page " + currentPage
                        + " of " + count;
                });
            }
            updatePageNumber();

            // Update Page Number when new page selected
            fvArticles.addEventListener("pageselected", updatePageNumber);

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
