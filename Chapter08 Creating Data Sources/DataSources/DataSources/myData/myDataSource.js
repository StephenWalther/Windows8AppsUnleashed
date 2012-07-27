/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />


(function () {

    // Define the IListDataAdapter.
    var MyDataAdapter = WinJS.Class.define(
        // Constructor
        function () {
            this._arrayData = [
                { key: "0", data: { name: "Wake up" } },
                { key: "1", data: { name: "Get out of bed" } },
                { key: "2", data: { name: "Drag the comb across my head" } }
            ];
            this._maxKey = 2;
        },

        // Instance Methods
        {

            // IListDataAdapter Methods

            getCount: function () {
                return WinJS.Promise.wrap(this._arrayData.length);
            },


            itemsFromIndex: function (requestIndex, countBefore, countAfter) {
                var startIndex = Math.max(0, requestIndex - countBefore);
                var subItems = this._arrayData.slice(startIndex);

                return WinJS.Promise.wrap({
                    items: subItems,
                    offset: requestIndex - startIndex,
                    totalCount: this._arrayData.length
                });
            },


            //insertAtEnd: function (unused, data) {
            //    return WinJS.Promise.wrapError(new WinJS.ErrorFromName(WinJS.UI.EditError.notPermitted));
            //},


            insertAtEnd: function (unused, data) {
                var newItem = {
                    key: (++this._maxKey).toString(),
                    data: data
                };
                this._arrayData.push(newItem);
                return WinJS.Promise.wrap(newItem);
            },


            remove: function (key) {
                var i = this._getIndexFromKey(key);
                this._arrayData.splice(i, 1);
                return WinJS.Promise.wrap(null);
            },

            change: function (key, data, indexHint) {
                var newItem = {
                    key: key,
                    data: data
                };
                var i = this._getIndexFromKey(key);
                this._arrayData[i] = data;
                return new WinJS.Promise.wrap(null);
            },


            _getIndexFromKey: function (key) {
                for (var i = 0; i < this._arrayData.length; i++) {
                    if (this._arrayData[i].key == key) {
                        return i;
                    }
                }
            },


            setNotificationHandler: function (notificationHandler) {
                this._notificationHandler = notificationHandler;
            },

            nuke: function () {
                this._arrayData = [];
                this._notificationHandler.reload();
            }


        }
    );

var MyDataSource = WinJS.Class.derive(
    WinJS.UI.VirtualizedDataSource,
    function (fileName) {
        this._adapter = new MyDataAdapter();
        this._baseDataSourceConstructor(this._adapter);
    },
    {
        nuke: function () {
            this._adapter.nuke();
        }
    }
);

WinJS.Namespace.define("DataSources", {
    MyDataSource: MyDataSource
});

})();