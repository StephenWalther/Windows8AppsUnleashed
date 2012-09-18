/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />


function init() {

    WinJS.UI.processAll().done(function () {
        var lvMovies = document.getElementById("lvMovies").winControl;

        // Create the data source options
        var createOptions = {
            databaseName: "MoviesDB",
            databaseVersion: 1,
            indexNames: ["category"]
        };

        // Create the IndexedDB data source
        var moviesDataSource = new DataSources.IndexedDbDataSource("movies", createOptions);

        // Add seed data
        addSeedData().done(function () {

            // Bind data source to ListView
            lvMovies.itemDataSource = moviesDataSource;
        });


        function addSeedData() {
            return new WinJS.Promise(function (complete) {
                moviesDataSource.getCount().then(function (count) {
                    if (count > 0) {
                        complete();
                    } else {
                        var seedData = [
                            { title: "Star Wars", category: "SciFi" },
                            { title: "Forbidden Planet", category: "SciFi" },
                            { title: "Show Boat", category: "Musical" }
                        ];

                        var promises = [];
                        seedData.forEach(function (data) {
                            promises.push(moviesDataSource.insertAtEnd(null, data));
                        });
                        WinJS.Promise.join(promises).done(function () {
                            complete();
                        });
                    }
                });
            });
        }


        // Wire-up SelectCategory, Add, Delete, Nuke buttons
        document.getElementById("selectCategory").addEventListener("change", function (evt) {
            var category = document.getElementById("selectCategory").value;
            if (category === "All") {
                moviesDataSource = new DataSources.IndexedDbDataSource("movies", createOptions);
            } else {
                var cursorOptions = {
                    indexName: "category",
                    only: document.getElementById("selectCategory").value
                };
                moviesDataSource = new DataSources.IndexedDbDataSource("movies", createOptions, cursorOptions);
            }
            lvMovies.itemDataSource = moviesDataSource;
        });


        document.getElementById("frmAdd").addEventListener("submit", function (evt) {
            evt.preventDefault();
            moviesDataSource.beginEdits();
            moviesDataSource.insertAtEnd(null, {
                title: document.getElementById("inputMovieTitle").value,
                category: document.getElementById("selectMovieCategory").value
            }).done(function (newItem) {
                moviesDataSource.endEdits();
                document.getElementById("frmAdd").reset();
                lvMovies.ensureVisible(newItem.index);
            });
        });

        document.getElementById("btnDelete").addEventListener("click", function () {
            if (lvMovies.selection.count() == 1) {
                moviesDataSource.beginEdits();
                lvMovies.selection.getItems().done(function (items) {
                    moviesDataSource.remove(items[0].key);
                    moviesDataSource.endEdits();
                });
            }
        });

        document.getElementById("btnEdit").addEventListener("click", function () {
            if (lvMovies.selection.count() == 1) {
                lvMovies.selection.getItems().done(function (items) {
                    moviesDataSource.beginEdits();
                    var movieToChange = items[0].data;
                    movieToChange.title = "Changed!";
                    moviesDataSource.change(items[0].key, movieToChange).done(function () {
                        moviesDataSource.endEdits();
                    });
                });
            }
        });

        document.getElementById("btnNuke").addEventListener("click", function () {
            moviesDataSource.nuke();
        });

    });
}

document.addEventListener("DOMContentLoaded", init);
