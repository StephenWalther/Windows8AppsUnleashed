(function () {
    "use strict";

    function initialize() {
        var dateBirthday = document.getElementById("dateBirthday");
        var ctlBirthday = new WinJS.UI.DatePicker(dateBirthday);
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
