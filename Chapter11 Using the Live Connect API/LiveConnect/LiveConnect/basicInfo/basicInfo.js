(function () {
    "use strict";
    var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
    
    function init() {
        var spanFirstName = document.getElementById("spanFirstName");
        var spanLastName = document.getElementById("spanLastName");
        var spanBirthday = document.getElementById("spanBirthday");
        var spanStatus = document.getElementById("spanStatus");
        var imgPhoto = document.getElementById("imgPhoto");

        // Initialize Windows Live
        var scopes = ["wl.signin", "wl.basic", "wl.birthday"];
        WL.init({
            scope: scopes,
            redirect_uri: REDIRECT_DOMAIN
        });

        // Log in to Windows Live
        WL.login().then(function (loginResults) {
            // Show basic info
            callLiveConnect("me", "GET").then(function (results) {
                spanFirstName.innerText = results.first_name;
                spanLastName.innerText = results.last_name;
                spanBirthday.innerText = results.birth_month
                    + "/" + results.birth_day;
            });

            // Show profile picture
            callLiveConnect("me/picture", "GET").then(function (results) {
                imgPhoto.src = results.location;
            });

        });

        // Call Live
        function callLiveConnect(path, method) {
            return new WinJS.Promise(function (complete, error) {
                WL.api({
                    path: path,
                    method: method
                }).then(
                    function(results) {
                        complete(results);
                    },
                    function(results) {
                        // Error calling WL.api()
                        debugger;
                    }
                );
            });
        }

    }

    document.addEventListener("DOMContentLoaded", init);
})();
