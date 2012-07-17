(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function() {
            var ctlBirthday = document.getElementById("dateBirthday").winControl;
            ctlBirthday.current = "12/25/1966";
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
