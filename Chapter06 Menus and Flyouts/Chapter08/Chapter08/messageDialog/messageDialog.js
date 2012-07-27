(function () {
    "use strict";

    function initialize() {
        var message = new Windows.UI.Popups.MessageDialog(
            "Did you know that your fly is unzipped?"
        );
        message.showAsync();
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
