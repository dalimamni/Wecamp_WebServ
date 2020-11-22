module.exports = app => {
    const conseil = require("../controllers/conseil.controller.js");
  
    // Create a new Customer
    app.post("/conseil", conseil.create);
  
    // Retrieve all Customers
    app.get("/conseil", conseil.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/conseil/:conseilId", conseil.findOne);
    // Update a Customer with customerId
    app.put("/conseil/:conseilId", conseil.update);

    // Delete a Customer with customerId
    app.delete("/conseil/:conseilId", conseil.delete);

    // Create a new Customer
    app.delete("/conseil", conseil.deleteAll);
    
  };