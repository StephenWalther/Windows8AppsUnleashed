(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
