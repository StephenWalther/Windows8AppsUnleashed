(function () {
    "use strict";

    function initialize() {
        // Create dialog
        var message = new Windows.UI.Popups.MessageDialog(
            "Did you know that your fly is unzipped?",
            "Warning!!!"
        );

        // Add commands
        message.commands.append(new Windows.UI.Popups.UICommand("&Yes"));
        message.commands.append(new Windows.UI.Popups.UICommand("&No"));

        // Show dialog
        message.showAsync().done(function(answer) {
            if (answer.label === "&Yes") {
                console.log("You picked yes");
            } else {
                console.log("You picked no");
            }
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
