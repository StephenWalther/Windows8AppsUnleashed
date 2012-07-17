/// <reference path="//Microsoft.WinJS.1.0.RC/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0.RC/js/ui.js" />


function init() {

    WinJS.UI.processAll().done(function () {
        var lvTasks = document.getElementById("lvTasks").winControl;

        // Bind the ListView to its data source
        var tasksDataSource = new DataSources.IndexedDbDataSource("TasksDB", 1, "tasks", upgrade);
        lvTasks.itemDataSource = tasksDataSource;

        // Wire-up Add, Delete, Nuke buttons
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

        document.getElementById("btnDelete").addEventListener("click", function () {
            if (lvTasks.selection.count() == 1) {
                lvTasks.selection.getItems().done(function (items) {
                    tasksDataSource.remove(items[0].data.id);
                });
            }
        });

        document.getElementById("btnNuke").addEventListener("click", function () {
            tasksDataSource.nuke();
        });

        // This method is called to initialize the IndexedDb database
        function upgrade(evt) {
            var newDB = evt.target.result;
            newDB.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
        }


    });
}

document.addEventListener("DOMContentLoaded", init);
