(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var btnEdit = document.getElementById("btnEdit");
            var menuEdit = document.getElementById("menuEdit").winControl;
            var selectTypeface = document.getElementById("selectTypeface");
            var pText = document.getElementById("pText");

            // When you click Edit then show the Menu
            btnEdit.addEventListener("click", function () {
                menuEdit.show(btnEdit);
            });

            // Wire-up menu commands
            document.getElementById("menuCommandDelete").addEventListener("click", function (evt) {
                pText.innerHTML = "[deleted]";
            });
            document.getElementById("menuCommandBold").addEventListener("click", function (evt) {
                var toggleState = document.getElementById("menuCommandBold").winControl.selected;
                if (toggleState) {
                    pText.style.fontWeight = 'bold'
                } else {
                    pText.style.fontWeight = 'normal'
                }
            });
            document.getElementById("menuCommandItalic").addEventListener("click", function (evt) {
                var toggleState = document.getElementById("menuCommandItalic").winControl.selected;
                if (toggleState) {
                    pText.style.fontStyle = 'italic'
                } else {
                    pText.style.fontStyle = 'normal'
                }
            });
            selectTypeface.addEventListener("change", function () {
                pText.style.fontFamily = selectTypeface.value;
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
