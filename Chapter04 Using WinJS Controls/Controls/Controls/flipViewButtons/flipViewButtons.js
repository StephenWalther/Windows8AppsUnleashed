(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var fvArticles = document.getElementById("fvArticles").winControl;
            var btnPrevious = document.getElementById("btnPrevious");
            var btnNext = document.getElementById("btnNext");

            // Setup Buttons
            btnPrevious.addEventListener("click", function () {
                fvArticles.previous();
            });
            btnNext.addEventListener("click", function () {
                fvArticles.next();
            });
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
