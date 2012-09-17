(function () {
    "use strict";

    function initialize() {
        var progress1 = document.getElementById("progress1");
        var ivlProgress = window.setInterval(updateProgress, 1000);

        function updateProgress() {
            progress1.value = ++progress1.value;
            if (progress1.value === 20) {
                window.clearInterval(ivlProgress);
            }
        }
    }
    document.addEventListener("DOMContentLoaded", initialize);
})();
