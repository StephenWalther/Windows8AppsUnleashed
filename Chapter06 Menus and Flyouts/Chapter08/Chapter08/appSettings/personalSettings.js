/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />

(function () {
    'use strict';
    
     WinJS.UI.Pages.define("personalSettings.html",
     {
         processed: function (element, options) {
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var divPersonal = document.getElementById("divPersonal").winControl;
            var frmSecurity = document.getElementById("frmPersonal");
            var inpFirstName = document.getElementById("inpFirstName");
            var inpLastName = document.getElementById("inpLastName");

            // Read the first and last name
            divPersonal.addEventListener("beforeshow", function () {
                inpFirstName.value = roamingSettings.values["firstName"] || "";
                inpLastName.value = roamingSettings.values["lastName"] || "";
            });

            // Save first and last names
            frmSecurity.addEventListener("submit", function () {
                roamingSettings.values["firstName"] = inpFirstName.value;
                roamingSettings.values["lastName"] = inpLastName.value;
            });

        }
     });
}());



