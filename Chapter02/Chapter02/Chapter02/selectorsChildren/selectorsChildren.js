(function () {
    "use strict";

    function initialize() {
        var discussContainer = WinJS.Utilities.id("discussContainer").get(0);
        WinJS.Utilities.children(discussContainer).setStyle("border", "2px dashed red");
    };

    document.addEventListener("DOMContentLoaded", initialize);
})();
