(function () {
    "use strict";

    function initialize() {
        WinJS.Utilities.query("button").listen("click", function () {
            WinJS.Utilities.query("div").clearStyle("display");
        });
    };

    document.addEventListener("DOMContentLoaded", initialize);
})();
