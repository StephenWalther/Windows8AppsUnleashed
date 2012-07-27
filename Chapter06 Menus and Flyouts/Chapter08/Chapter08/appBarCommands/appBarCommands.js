(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var cmdPlay = document.getElementById("cmdPlay");
            cmdPlay.addEventListener("click", function () {
                console.log("Play song");
            });

            var cmdMute = document.getElementById("cmdMute");
            cmdMute.addEventListener("click", function () {
                console.log(cmdMute.winControl.selected);
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
