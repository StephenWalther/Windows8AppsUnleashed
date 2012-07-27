// For an introduction to the Search Contract template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232512

// TODO: Add the following script tag to the start page's head to
// subscribe to search contract events.
//  
// <script src="/js/searchResults.js"></script>

(function () {
    "use strict";

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/js/searchResults.html";

    ui.Pages.define(searchPageURI, {
        /// <field elementType="Object" />
        filters: [],
        lastSearch: "",

        generateFilters: function () {
            this.filters = [];
            this.filters.push({ results: null, text: "All", predicate: function (item) { return true; } });

            // TODO: Replace or remove example filters.
            this.filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this.filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: Navigate to the item that was invoked.
                // nav.navigate("/html/<yourpage>.html", {item: item.data});
            });
        },

        // This function populates a WinJS.Binding.List with search results for the
        // provided query.
        searchData: function (queryText) {
            var originalResults;
            var regex;
            // TODO: Perform the appropriate search on your data.
            if (window.Data) {
                originalResults = Data.items.createFiltered(function (item) {
                    regex = new RegExp(queryText, "gi");
                    return (item.title.match(regex) || item.subtitle.match(regex) || item.description.match(regex));
                });
            } else {
                originalResults = new WinJS.Binding.List();
            }
            return originalResults;
        },

        // This function filters the search data using the specified filter.
        applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // This function responds to a user selecting a new filter. It updates the
        // selection list and the displayed results.
        filterChanged: function (element, filterIndex) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;

            utils.removeClass(filterBar.querySelector(".highlight"), "highlight");
            utils.addClass(filterBar.childNodes[filterIndex], "highlight");

            element.querySelector(".filterselect").selectedIndex = filterIndex;

            listView.itemDataSource = this.filters[filterIndex].results.dataSource;
        },

        // This function executes each step required to perform a search.
        handleQuery: function (element, args) {
            var originalResults;
            this.lastSearch = args.queryText;
            WinJS.Namespace.define("searchResults", { markText: this.markText.bind(this) });
            utils.markSupportedForProcessing(searchResults.markText);
            this.initializeLayout(element.querySelector(".resultslist").winControl, Windows.UI.ViewManagement.ApplicationView.value);
            this.generateFilters();
            originalResults = this.searchData(args.queryText);
            this.populateFilterBar(element, originalResults);
            this.applyFilter(this.filters[0], originalResults);
        },

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            var modernQuotationMark = "&#148;";
            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
                document.querySelector(".titlearea .pagetitle").innerHTML = modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
                document.querySelector(".titlearea .pagesubtitle").innerHTML = "";
            } else {
                listView.layout = new ui.GridLayout();
                document.querySelector(".titlearea .pagetitle").innerHTML = "Search";
                document.querySelector(".titlearea .pagesubtitle").innerHTML = "Results for " + modernQuotationMark + toStaticHTML(this.lastSearch) + modernQuotationMark;
            }
        },

        // This function colors the search term. Referenced in /js/searchResults.html
        // as part of the ListView item templates.
        markText: function (source, sourceProperties, dest, destProperties) {
            var text = source[sourceProperties[0]];
            var regex = new RegExp(this.lastSearch, "gi");
            dest[destProperties[0]] = text.replace(regex, "<mark>$&</mark>");
        },

        // This function generates the filter selection list.
        populateFilterBar: function (element, originalResults) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;
            var li, option, filterIndex;

            filterBar.innerHTML = "";
            for (filterIndex = 0; filterIndex < this.filters.length; filterIndex++) {
                this.applyFilter(this.filters[filterIndex], originalResults);

                li = document.createElement("li");
                li.filterIndex = filterIndex;
                li.tabIndex = 0;
                li.textContent = this.filters[filterIndex].text + " (" + this.filters[filterIndex].results.length + ")";
                li.onclick = function (args) { this.filterChanged(element, args.target.filterIndex); }.bind(this);
                li.onkeyup = function (args) {
                    if (args.key === "Enter" || args.key === "Spacebar")
                        this.filterChanged(element, args.target.filterIndex);
                }.bind(this);
                filterBar.appendChild(li);

                if (filterIndex === 0) {
                    utils.addClass(li, "highlight");
                    listView.itemDataSource = this.filters[filterIndex].results.dataSource;
                }

                option = document.createElement("option");
                option.value = filterIndex;
                option.textContent = this.filters[filterIndex].text + " (" + this.filters[filterIndex].results.length + ")";
                element.querySelector(".filterselect").appendChild(option);
            }

            element.querySelector(".filterselect").onchange = function (args) { this.filterChanged(element, args.currentTarget.value); }.bind(this);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            listView.itemTemplate = element.querySelector(".itemtemplate")
            listView.oniteminvoked = this.itemInvoked;
            this.handleQuery(element, options);
            listView.element.focus();
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector(".resultslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    var firstVisible = listView.indexOfFirstVisible;
                    this.initializeLayout(listView, viewState);
                    listView.indexOfFirstVisible = firstVisible;
                }
            }
        }
    });

    WinJS.Application.addEventListener("activated", function (args) {
        if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }
    });

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };
})();
