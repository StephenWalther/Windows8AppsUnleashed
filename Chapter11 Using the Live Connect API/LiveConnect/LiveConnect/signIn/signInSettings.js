/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    'use strict';

    WinJS.UI.Pages.define("signInSettings.html",
    {
        ready: function (element, options) {

            WL.ui({
                name: "signin",
                element: "divSignInControl",
                theme: "dark"
            });
        }
    });
}());



