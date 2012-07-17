(function () {
    "use strict";

    function initialize() {
        // Create the xhr options
        var options = {
            url: "http://Microsoft.com",
            responseType: "document"
        };

        // Make the Ajax request
        WinJS.xhr(options).done(
            function (xhr) {
                var li;
                var ulResults = document.getElementById("ulResults");
                var links = xhr.response.querySelectorAll("a");
                for (var i=0;i<links.length;i++) {
                    li = document.createElement("LI");
                    li.innerText = links[i].href;
                    ulResults.appendChild(li);
                }
            },
            function () {
                var messageDialog = new Windows.UI.Popups.MessageDialog("Could not download page!");
                messageDialog.showAsync();
            }
        );
    };

    document.addEventListener("DOMContentLoaded", initialize);
})();
