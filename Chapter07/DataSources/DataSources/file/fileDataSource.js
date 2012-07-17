/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />


(function () {

    // Define the IListDataAdapter.
    var FileDataAdapter = WinJS.Class.define(
        // Constructor
        function (fileName) {
            this._fileName = fileName;
        },

        // Instance Methods
        {

            // IListDataAdapter Methods

            getCount: function () {
                var that = this;

                return new WinJS.Promise(function (complete, error) {
                    that._ensureData().done(function (data) {
                        complete(data.items.length);
                    });
                });
            },


            itemsFromIndex: function (requestIndex, countBefore, countAfter) {
                var that = this;

                return new WinJS.Promise(function (complete, error) {
                    var startIndex = Math.max(0, requestIndex - countBefore);
                    that._ensureData().then(
                        function (data) {
                            var subItems = data.items.slice(startIndex);
                            complete({
                                items: subItems,
                                offset: requestIndex - startIndex,
                                totalCount: data.items.length
                            });

                        });
                });
            },




            insertAtEnd: function (unused, newItem) {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._ensureData().then(function (data) {
                        var newKey = (++data.maxKey).toString();
                        data.items.push({
                            key: newKey,
                            data: newItem
                        });
                        that._saveData(data).then(function () {
                            complete({
                                key: newKey,
                                data: newItem
                            });
                        });
                    });
                });
            },


            change: function(key, changedData, indexHint) {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._ensureData().then(function (data) {
                        var i = that._getIndexFromKey(data.items, key);
                        var changedItem = {
                            key: key,
                            index: indexHint,
                            data: changedData
                        };
                        data.items[i] = changedItem;
                        that._saveData(data).then(function () {
                            complete(changedItem);
                        });
                    });
                });
            },


            remove: function (key) {
                var that = this;
                return that._ensureData().then(function (data) {
                    var i = that._getIndexFromKey(data.items, key);
                    data.items.splice(i, 1);
                    return that._saveData(data);
                });
            },


            setNotificationHandler: function (notificationHandler) {
                this._notificationHandler = notificationHandler;
            },

            // New Methods

            nuke: function () {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    var local = WinJS.Application.local;
                    return local.remove(that._fileName).done(function(){
                        that._cachedData = null;
                        that._notificationHandler.reload();
                    });
                });
            },


            // Private Methods

_ensureData: function () {
    var that = this;

    // Attempt to return cached data
    if (this._cachedData) {
        return WinJS.Promise.wrap(that._cachedData);
    }

    // Otherwise, load from file
    return new WinJS.Promise(function (complete, error) {
        var local = WinJS.Application.local;
        var def = '{"maxKey":-1,"items":[]}';
        local.readText(that._fileName, def).done(function(fileContents) {
            that._cachedData = JSON.parse(fileContents);
            complete(that._cachedData);
        });
    });
},


_saveData: function (data) {
    this._cachedData = data;
    var local = WinJS.Application.local;
    var str = JSON.stringify(data);
    return local.writeText(this._fileName, str);
},


            _getIndexFromKey: function (items, key) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].key === key) {
                        return i;
                    }
                }
            }


        }
    );

    var FileDataSource = WinJS.Class.derive(
        WinJS.UI.VirtualizedDataSource,
        function (fileName) {
            this._adapter = new FileDataAdapter(fileName);
            this._baseDataSourceConstructor(this._adapter);
        },
        {
            nuke: function () {
                this._adapter.nuke();
            }
        }
    );

    WinJS.Namespace.define("DataSources", {
        FileDataSource: FileDataSource
    });

})();