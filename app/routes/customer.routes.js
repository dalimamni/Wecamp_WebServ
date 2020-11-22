module.exports = app => {
    const lieux = require("../controllers/customer.controller.js");
  
    // Create a new Customer
    app.post("/lieux", lieux.create);
  
    // Retrieve all Customers
    app.get("/lieux", lieux.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/lieux/:lieuId", lieux.findOne);
    // Update a Customer with customerId
    app.put("/lieux/:lieuId", lieux.update);

    // Delete a Customer with customerId
    app.delete("/lieux/:lieuId", lieux.delete);

    // Create a new Customer
    app.delete("/lieux", lieux.deleteAll);
    
  };