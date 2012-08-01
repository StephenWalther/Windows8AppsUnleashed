(function () {
    "use strict";
    var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
    
    function init() {
        WinJS.UI.processAll().done(function () {
            var lvFiles = document.getElementById("lvFiles").winControl;

            // Initialize Live Connect
            var scopes = ["wl.signin", "wl.skydrive"];
            WL.init({
                scope: scopes,
                redirect_uri: REDIRECT_DOMAIN
            });

            // Log in to Live Connect
            WL.login().then(function (loginResults) {
                // Get List of top-level SkyDrive files
                callLiveConnect("me/skydrive/files", "GET").then(function (results) {
                    var items = [];
                    for (var key in results.data) {
                        items.push(results.data[key]);
                    }
                    var dsItems = new WinJS.Binding.List(items);
                    lvFiles.itemDataSource = dsItems.dataSource;
                });
            });

        });

        // Call Live Connect
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
