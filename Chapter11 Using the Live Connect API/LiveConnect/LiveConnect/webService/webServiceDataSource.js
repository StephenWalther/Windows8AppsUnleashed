/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />


(function () {

    // Define the IListDataAdapter.
    var WebServiceDataAdapter = WinJS.Class.define(
        function (url, key, authenticationToken) {

            // Constructor
            this._url = url;
            this._key = key;
            this._authenticationToken = authenticationToken;
        },


        {

            getCount: function () {
                var that = this;

                return new WinJS.Promise(function (complete, error) {
                    var options = {
                        url: that._url + "/getCount",
                        headers: { authenticationToken: that._authenticationToken }
                    };
                    return WinJS.xhr(options).then(function (xhr) {
                        var count = JSON.parse(xhr.response);
                        complete(count);
                    },
                    function (xhr) {
                        console.log("Could not call getCount()");
                        debugger;
                    });
                });
            },


            itemsFromIndex: function (requestIndex, countBefore, countAfter) {
                var that = this;

                return new WinJS.Promise(function (complete, error) {
                    var url = that._url
                        + "/itemsFromIndex?requestIndex=" + requestIndex
                        + "&countBefore=" + countBefore
                        + "&countAfter=" + countAfter;

                        var options = {
                            url: url,
                            headers: {authenticationToken: that._authenticationToken}
                        };
                        WinJS.xhr(options).then(
                            function (xhr) {
                                var data = JSON.parse(xhr.response);

                                var items = [];
                                for (var i = 0; i < data.items.length; i++) {
                                    items.push({
                                        key: data.items[i][that._key].toString(),
                                        data: data.items[i]
                                    });
                                }
 
                                complete({
                                    items: items,
                                    offset: data.offset,
                                    totalCount: data.totalCount
                                });

                            },
                            function (xhr) {
                                console.log("Could not call itemsFromIndex()");
                                debugger;
                            }
                        );
                    });
            },




            insertAtEnd: function (unused, data) {
                var that = this;
                return new WinJS.Promise(function (complete) {
                    var options = {
                        url: that._url + "/insertAtEnd",
                        data: JSON.stringify(data),
                        type: "POST",
                        headers: {
                            "Content-type": "application/json;charset=UTF-8",
                            authenticationToken: that._authenticationToken
                        }
                    };
                    WinJS.xhr(options).then(
                        function (xhr) {
                            var newItem = JSON.parse(xhr.response);
                            complete({
                                key: newItem[that._key].toString(),
                                data: newItem
                            });

                        },
                        function (xhr) {
                            console.log("Could not call insertAtEnd()");
                            debugger;
                        }
                    );
                });
            },


            setNotificationHandler: function (notificationHandler) {
                this._notificationHandler = notificationHandler;
            },


            remove: function(key) {
                var that = this;
                return new WinJS.Promise(function (complete) {
                    var options = {
                        url: that._url + "/remove/" + key,
                        type: "DELETE",
                        headers: {
                            authenticationToken: that._authenticationToken
                        }
                    };
                    WinJS.xhr(options).then(
                        function (xhr) {
                            complete();
                        },
                        function (xhr) {
                            console.log("Could not call remove()");
                            debugger;
                        }
                    );
                });
            },




            change: function (key, data, indexHint) {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    var options = {
                        url: that._url + "/change",
                        type: "PUT",
                        data: JSON.stringify(data),
                        headers: {
                            "Content-type": "application/json;charset=UTF-8",
                            authenticationToken: that._authenticationToken
                        }
                    };
                    WinJS.xhr(options).then(
                        function (xhr) {
                            complete();
                        },
                        function (xhr) {
                            console.log("Could not call change()");
                            debugger;
                        }
                    );
                });
            },



            nuke: function () {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    var options = {
                        url: that._url + "/nuke",
                        type: "DELETE",
                        headers: {
                            authenticationToken: that._authenticationToken
                        }
                    };
                    WinJS.xhr(options).then(
                        function (xhr) {
                            that._notificationHandler.reload();
                            complete();
                        },
                        function (xhr) {
                            console.log("Could not call nuke()");
                            debugger;
                        }
                    );
                });
            }




        }
    );

    var WebServiceDataSource = WinJS.Class.derive(
        WinJS.UI.VirtualizedDataSource,
        function (url, key, authenticationToken) {
            this._adapter = new WebServiceDataAdapter(url, key, authenticationToken);
            this._baseDataSourceConstructor(this._adapter);
        },
        {
            nuke: function () {
                return this._adapter.nuke();
            }
        }
    );

    WinJS.Namespace.define("DataSources", {
        WebServiceDataSource: WebServiceDataSource
    });

})();