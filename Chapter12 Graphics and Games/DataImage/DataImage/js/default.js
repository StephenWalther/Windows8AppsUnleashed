// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        var inpUpload = document.getElementById("inpUpload");
        var txtResults = document.getElementById("txtResults");
        var imgResults = document.getElementById("imgResults");

        inpUpload.addEventListener("change", function () {
            // Get the file data
            if (inpUpload.files.length > 0) {
                var imageData = inpUpload.files[0];

                // Use FileReader to convert to Base64
                var reader = new FileReader();
                reader.onload = function (e) {
                    txtResults.value = e.target.result;
                    imgResults.src = e.target.result;
                };
                reader.readAsDataURL(imageData);                
            }
        });
    };

    app.start();
})();
