// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    
    function init() {
        var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
        var spanResult = document.getElementById("spanResult");

        var scopes = ["wl.signin"];
        WL.init({
            scope: scopes,
            redirect_uri: REDIRECT_DOMAIN
        });

        WL.login().then(
            function (loginResults) {
                spanResult.innerText = "Success!";
            },
            function (loginResponse) {
                spanResult.innerText = "Could not login";
            }
        );

    }

    document.addEventListener("DOMContentLoaded", init);
})();
