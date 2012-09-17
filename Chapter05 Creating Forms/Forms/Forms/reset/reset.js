(function () {
    "use strict";

    function initialize() {
        var frmAdd = document.getElementById("frmAdd");
        var inpTitle = document.getElementById("inpTitle");

        frmAdd.addEventListener("submit", function (evt) {
            evt.preventDefault();
            var newMovie = {
                title: document.getElementById("inpTitle").value
            };
            addMovieToDb(newMovie).done(function () {
                frmAdd.reset();
            });
        });

        function addMovieToDb(newMovie) {
            return new WinJS.Promise(function (complete) {
                // Add to database
                complete();
            });
        }
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
