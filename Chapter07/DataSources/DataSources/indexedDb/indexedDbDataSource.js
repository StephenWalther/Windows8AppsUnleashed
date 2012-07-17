(function () {

    /************************************************
    * The IndexedDBDataAdapter enables you to work 
    * with a HTML5 IndexedDB database.
    *************************************************/

    var IndexedDbDataAdapter = WinJS.Class.define(
        function (dbName, dbVersion, objectStoreName, upgrade, error) {
            this._dbName = dbName;  // database name
            this._dbVersion = dbVersion;  // database version
            this._objectStoreName = objectStoreName; // object store name
            this._upgrade = upgrade; // database upgrade script
            this._error = error || function (evt) { console.log(evt.message); };
        },
        {

            /*******************************************
            *  IListDataAdapter Interface Methods
            ********************************************/

            getCount: function () {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._getObjectStore().then(function (store) {
                        var reqCount = store.count();
                        reqCount.onerror = that._error;
                        reqCount.onsuccess = function (evt) {
                            complete(evt.target.result);
                        };
                    });
                });
            },


            itemsFromIndex: function (requestIndex, countBefore, countAfter) {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that.getCount().then(function (count) {
                        if (requestIndex >= count) {
                            return WinJS.Promise.wrapError(new WinJS.ErrorFromName(WinJS.UI.FetchError.doesNotExist));
                        }
                        var startIndex = Math.max(0, requestIndex - countBefore);
                        var endIndex = Math.min(count, requestIndex + countAfter + 1);

                        that._getObjectStore().then(function (store) {
                            var index = 0;
                            var items = [];
                            var req = store.openCursor();
                            req.onerror = that._error;
                            req.onsuccess = function (evt) {
                                var cursor = evt.target.result;

                                if (index < startIndex) {
                                    index = startIndex;
                                    cursor.advance(startIndex);
                                    return;
                                }

                                if (cursor && index < endIndex) {
                                    index++;
                                    items.push({
                                        key: cursor.value[store.keyPath].toString(),
                                        data: cursor.value
                                    });
                                    cursor.continue();
                                    return;
                                }

                                results = {
                                    items: items,
                                    offset: requestIndex - startIndex,
                                    totalCount: count
                                };
                                complete(results);
                            };
                        });
                    });
                });
            },


            insertAtEnd:function(unused, data) {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._getObjectStore("readwrite").done(function(store) {
                        var reqAdd = store.add(data);
                        reqAdd.onerror = that._error;
                        reqAdd.onsuccess = function (evt) {
                            var reqGet = store.get(evt.target.result);
                            reqGet.onerror = that._error;
                            reqGet.onsuccess = function (evt) {
                                var newItem = {
                                    key:evt.target.result[store.keyPath].toString(),
                                    data:evt.target.result
                                }
                                complete(newItem);
                            };
                        };
                    });
                });
            },


            setNotificationHandler: function (notificationHandler) {
                this._notificationHandler = notificationHandler;
            },


            /*****************************************
            *  IndexedDbDataSource Method
            ******************************************/


            removeInternal: function(key) {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._getObjectStore("readwrite").done(function (store) {
                        var reqDelete = store.delete (key);
                        reqDelete.onerror = that._error;
                        reqDelete.onsuccess = function (evt) {
                            that._notificationHandler.removed(key.toString());
                            complete();
                        };
                    });
                });
            },


            nuke: function () {
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._getObjectStore("readwrite").done(function (store) {
                        var reqClear = store.clear();
                        reqClear.onerror = that._error;
                        reqClear.onsuccess = function (evt) {
                            that._notificationHandler.reload();
                            complete();
                        };
                    });
                });
            },



            /*******************************************
            *  Private Methods
            ********************************************/

            _ensureDbOpen: function () {
                var that = this;
                
                // Try to get cached Db
                if (that._cachedDb) {
                    return WinJS.Promise.wrap(that._cachedDb);
                }

                // Otherwise, open the database
                return new WinJS.Promise(function (complete, error, progress) {
                    var reqOpen = window.indexedDB.open(that._dbName, that._dbVersion);
                    reqOpen.onerror = function (evt) {
                        error();
                    };
                    reqOpen.onupgradeneeded = function (evt) {
                        that._upgrade(evt);
                        that._notificationHandler.invalidateAll();
                    };
                    reqOpen.onsuccess = function () {
                        that._cachedDb = reqOpen.result;
                        complete(that._cachedDb);
                    };
                });
            },


            _getObjectStore: function (type) {
                type = type || "readonly";
                var that = this;
                return new WinJS.Promise(function (complete, error) {
                    that._ensureDbOpen().then(function (db) {
                        var transaction = db.transaction(that._objectStoreName, type);
                        complete(transaction.objectStore(that._objectStoreName));
                    });
                });
            },

            _get: function (key) {
                return new WinJS.Promise(function (complete, error) {
                    that._getObjectStore().done(function (store) {
                        var reqGet = store.get(key);
                        reqGet.onerror = that._error;
                        reqGet.onsuccess = function (item) {
                            complete(item);
                        };
                    });
                });
            }


        }
    );

    var IndexedDbDataSource = WinJS.Class.derive(
        WinJS.UI.VirtualizedDataSource,
        function (dbName, dbVersion, objectStoreName, upgrade, error) {
            this._adapter = new IndexedDbDataAdapter(dbName, dbVersion, objectStoreName, upgrade, error);
            this._baseDataSourceConstructor(this._adapter);
        },
        {
            nuke: function () {
                this._adapter.nuke();
            },

            remove: function (key) {
                this._adapter.removeInternal(key);
            }

        }
    );

    WinJS.Namespace.define("DataSources", {
        IndexedDbDataSource: IndexedDbDataSource
    });




})();