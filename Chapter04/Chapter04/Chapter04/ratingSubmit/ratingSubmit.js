(function () {
    "use strict";

    function initialize() {


        WinJS.UI.processAll().done(function () {
            var ratingStore = document.getElementById("ratingStore").winControl;
            var divMessage = document.getElementById("divMessage");

            ratingStore.addEventListener("previewchange", function (evt) {
                var tentativeRating = evt.detail.tentativeRating;

                switch (tentativeRating) {
                    case 1: divMessage.innerHTML = "Don't do it! That's just mean!";
                        break;
                    case 2: divMessage.innerHTML = "Okay, you sure? We'll try harder!";
                        break;
                    case 3: divMessage.innerHTML = "Thanks!";
                        break;
                }
            });



            ratingStore.addEventListener("cancel", function (evt) {
                divMessage.innerHTML = "";
            });


            ratingStore.addEventListener("change", function(evt) {
                var userRating = ratingStore.userRating;
                
                switch (userRating) {
                    case 1: divMessage.innerHTML = "You gave us the worst rating.";
                        break;
                    case 2: divMessage.innerHTML = "You gave us an okay rating.";
                        break;
                    case 3: divMessage.innerHTML = "You gave us a good rating.";
                        break;
                }
            });




        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
