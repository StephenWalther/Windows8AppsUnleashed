(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvBlog = document.getElementById("lvBlog").winControl;

            // Use WinRT SyndicationClient to get blog feed
            var client = new Windows.Web.Syndication.SyndicationClient();
            var feedURI = new Windows.Foundation.Uri("http://stephenwalther.com/blog/feed");
            client.retrieveFeedAsync(feedURI).done(function (feed) {

                // Convert feed items to a List
                var listItems = new WinJS.Binding.List(feed.items);

                // Bind list to ListView
                lvBlog.itemDataSource = listItems.dataSource;
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
