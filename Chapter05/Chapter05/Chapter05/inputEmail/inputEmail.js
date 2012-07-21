(function () {
    "use strict";

    function initialize() {

        var frmAdd = document.getElementById("frmAdd");

        frmAdd.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });

    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
