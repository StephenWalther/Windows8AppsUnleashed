/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    "use strict";

    var Alert = WinJS.UI.Pages.define("/myControls/alert.html", {

        ready: function (element, options) {
            var btn = WinJS.Utilities.query("button", element);

            // Set option defaults
            options.buttonLabel = options.buttonLabel || "Show Alert";
            options.message = options.message || "Alert!!!";

            // Update button label text           
            btn[0].innerText = options.buttonLabel;

            // Setup click handler
            btn.listen("click", function () {
                var md = new Windows.UI.Popups.MessageDialog(
                    options.message
                );
                md.showAsync();
            });
        }
    });

    WinJS.Namespace.define("MyControls", {
        Alert: Alert
    });
})();
