(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function() {
            var dateBirthday = document.getElementById("dateBirthday").winControl;
            var divMessage = document.getElementById("divMessage");

            dateBirthday.addEventListener("change", function (evt) {
                divMessage.innerHTML = "Your birthday is on "
                    + dateBirthday.current.toDateString();
            });
            
        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();




