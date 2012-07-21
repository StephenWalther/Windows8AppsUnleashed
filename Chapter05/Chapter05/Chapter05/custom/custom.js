(function () {
    "use strict";

    function initialize() {

        var userName = document.getElementById("userName");

        userName.addEventListener("input", function (evt) {
            // User name must be more than 3 characters
            if (userName.value.length < 4) {
                userName.setCustomValidity("User name too short!");
            } else {
                userName.setCustomValidity("");
            }
        });


    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
