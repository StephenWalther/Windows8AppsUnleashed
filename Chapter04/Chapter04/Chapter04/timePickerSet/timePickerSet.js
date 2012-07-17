(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var timeLunch = document.getElementById("timeLunch").winControl;
            var divMessage = document.getElementById("divMessage");

            timeLunch.addEventListener("change", function (evt) {
                divMessage.innerHTML = "Lunch time is "
                    + timeLunch.current.toTimeString();
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
