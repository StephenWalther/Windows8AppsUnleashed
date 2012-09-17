(function () {
    "use strict";

    // Aliases
    var capture = Windows.Media.Capture;

    // Executed immediately after page content is loaded
    function init() {
        // Process all of the controls
        WinJS.UI.processAll().done(function () {
            // References to DOM elements
            var cmdTakePicture = document.getElementById("cmdTakePicture");
            var imgPhoto = document.getElementById("imgPhoto");

            // Handle Take Picture command click
            cmdTakePicture.addEventListener("click", function () {
                var captureUI = new capture.CameraCaptureUI();
                captureUI.photoSettings.format = capture.CameraCaptureUIPhotoFormat.png;
                captureUI.captureFileAsync(capture.CameraCaptureUIMode.photo).done(function (photo) {
                    if (photo) {
                        // Use HTML5 File API to create object URL to refer to the photo file
                        var photoUrl = URL.createObjectURL(photo);

                        // Show photo in IMG element
                        imgPhoto.src = photoUrl;
                    }
                });
            });
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();
