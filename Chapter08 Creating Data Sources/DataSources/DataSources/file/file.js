/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
function init() {

    WinJS.UI.processAll().done(function () {
        var lvTasks = document.getElementById("lvTasks").winControl;

        // Create data source and bind to ListView
        var tasksDataSource = new DataSources.FileDataSource("tasks.json");
        lvTasks.itemDataSource = tasksDataSource;


        // Wire-up frmAdd and Delete, Nuke buttons
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
                    tasksDataSource.beginEdits();
                    tasksDataSource.remove(items[0].key).done(function() {
                        tasksDataSource.endEdits();
                    });
                });
            }
        });

        document.getElementById("btnEdit").addEventListener("click", function () {
            if (lvTasks.selection.count() == 1) {
                lvTasks.selection.getItems().done(function (items) {
                    tasksDataSource.beginEdits();
                    tasksDataSource.change(items[0].key, {name:"Changed!"}).done(function () {
                       tasksDataSource.endEdits();
                    });
                });
            }
        });

        document.getElementById("btnNuke").addEventListener("click", function () {
            tasksDataSource.nuke();
        });

    });

}

document.addEventListener("DOMContentLoaded", init);
