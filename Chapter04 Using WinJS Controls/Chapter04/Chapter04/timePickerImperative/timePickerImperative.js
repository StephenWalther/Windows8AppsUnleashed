(function () {
    "use strict";

    function initialize() {
        var divLunch = document.getElementById("timeLunch");
        var ctrlLunch = new WinJS.UI.TimePicker(timeLunch, {
            current: '3:04pm',
            clock: '24HourClock'
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
