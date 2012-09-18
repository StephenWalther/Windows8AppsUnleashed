(function () {
    "use strict";

    function initialize() {

        var frmAdd = document.getElementById("frmAdd");

        frmAdd.addEventListener("submit", function (evt) {
            evt.preventDefault();

            var imgPicture = document.getElementById("imgPicture");
            var inpFile = document.getElementById("inpFile");

            if (inpFile.files.length > 0) {
                // Use HTML5 File API to create object URL to refer to the photo file
                var pictureUrl = URL.createObjectURL(inpFile.files[0]);

                // Show photo in IMG element
                imgPicture.src = pictureUrl;
            }
        });

    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
