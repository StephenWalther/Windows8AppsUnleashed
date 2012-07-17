(function (global) {

    // Public method which calculates tax
    function calculateTax(price) {
        return calculateFederalTax(price) + calculateStateTax(price);
    }

    // Private method for calculating state tax
    function calculateStateTax(price) {
        return price * 0.08;
    }

    // Private method for calculating federal tax
    function calculateFederalTax(price) {
        return price * 0.02;
    }

    // Public method which returns the expected ship date
    function calculateShipDate(currentDate) {
        currentDate.setDate(currentDate.getDate() + 4);
        return currentDate;
    }

    // Export public methods
    WinJS.Namespace.define("CompanyA.Utilities",
        {
            calculateTax: calculateTax,
            calculateShipDate: calculateShipDate
        }
    );

})(this);

// Show expected ship date
var shipDate = CompanyA.Utilities.calculateShipDate(new Date());
console.log(shipDate);

// Show price + tax
var price = 12.33;
var tax = CompanyA.Utilities.calculateTax(price);
console.log(price + tax);
