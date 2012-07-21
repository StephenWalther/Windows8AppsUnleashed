(function () {
    "use strict";

    function initialize() {

        var frmAdd = document.getElementById("frmAdd");
        var inpFavNumber = document.getElementById("inpFavNumber");

        frmAdd.addEventListener("submit", function (evt) {
            evt.preventDefault();
            var favoriteNumber = inpFavNumber.valueAsNumber;
        });

    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
