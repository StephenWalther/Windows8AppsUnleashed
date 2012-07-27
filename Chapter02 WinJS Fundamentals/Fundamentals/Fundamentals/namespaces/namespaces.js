// Create CompanyA namespace with ShoppingCart
WinJS.Namespace.define("CompanyA");
CompanyA.ShoppingCart = {
    checkout: function () { return "Checking out from A"; }
};

// Create CompanyB.Controls namespace with ShoppingCart
WinJS.Namespace.define(
    "CompanyB.Controls",
    {
        ShoppingCart: {
            checkout: function () { return "Checking out from B"; }
        }
    }
);

// Call CompanyA ShoppingCart checkout method
console.log(CompanyA.ShoppingCart.checkout());  // Writes "Checking out from A"

// Call CompanyB.Controls checkout method
console.log(CompanyB.Controls.ShoppingCart.checkout());  // Writes "Checking out from B"
