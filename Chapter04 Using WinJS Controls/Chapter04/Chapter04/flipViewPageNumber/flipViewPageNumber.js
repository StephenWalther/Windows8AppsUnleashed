(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var fvArticles = document.getElementById("fvArticles").winControl;
            var divPageNumber = document.getElementById("divPageNumber");

            // Create List of articles
            var listArticles = new WinJS.Binding.List([
                {
                    title: "Why Dogs are Better than Cats",
                    author: "Arnold Wiggles",
                    articleText: "Pellentesque habitant morbi tristique senectus et netus \
et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci."
                },
                {
                    title: "Why Dogs are Better than Fish",
                    author: "Jane Rubble",
                    articleText: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \
Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar \
ultricies, purus lectus malesuada libero, sit amet commodo magna \
eros quis urna."
                },
                {
                    title: "Why Dogs are Better than Mice",
                    author: "Eric Alexander",
                    articleText: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \
Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar \
ultricies, purus lectus malesuada libero, sit amet commodo magna \
eros quis urna."
                }
            ]);

            // Bind FlipView to List
            fvArticles.itemDataSource = listArticles.dataSource;

            // Show Page Number and Page Count
            function updatePageNumber() {
                var currentPage = fvArticles.currentPage + 1;
                fvArticles.count().done(function (count) {
                    divPageNumber.innerHTML = "Page " + currentPage
                        + " of " + count;
                });
            }
            updatePageNumber();

            // Update Page Number when new page selected
            fvArticles.addEventListener("pageselected", updatePageNumber);

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
