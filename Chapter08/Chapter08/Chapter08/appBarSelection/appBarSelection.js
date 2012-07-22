(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {

            var lvTasks = document.getElementById("lvTasks").winControl;
            var appBar1 = document.getElementById("appBar1").winControl;

            // Create data source and bind to ListView
            var tasksDataSource = new DataSources.MyDataSource();
            lvTasks.itemDataSource = tasksDataSource;

            // Hide selection commands by default
            appBar1.hideCommands(document.querySelectorAll('.appBarSelection'));

            // When ListView item selected, display app bar
            lvTasks.addEventListener("selectionchanged", function () {
                if (lvTasks.selection.count() == 1) {
                    appBar1.showCommands(document.querySelectorAll('.appBarSelection'));
                    appBar1.show();
                } else {
                    appBar1.hideCommands(document.querySelectorAll('.appBarSelection'));
                };
            });


            // Wire-up Add, Delete buttons
            document.getElementById("frmAdd").addEventListener("submit", function (evt) {
                evt.preventDefault();
                tasksDataSource.beginEdits();
                tasksDataSource.insertAtEnd(null, {
                    name: document.getElementById("inputTaskName").value
                }).done(function (newItem) {
                    tasksDataSource.endEdits();
                    document.getElementById("frmAdd").reset();
                    lvTasks.ensureVisible(newItem.index);
                });
            });

            document.getElementById("cmdDelete").addEventListener("click", function () {
                if (lvTasks.selection.count() == 1) {
                    lvTasks.selection.getItems().done(function (items) {
                        tasksDataSource.beginEdits();
                        tasksDataSource.remove(items[0].key).done(function () {
                            tasksDataSource.endEdits();
                        });
                    });
                }
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
