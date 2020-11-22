module.exports = app => {
    const membre = require("../controllers/membre.controller.js");
  
    // Create a new Customer
    app.post("/membre", membre.create);
  
    // Retrieve all Customers
    app.get("/membre", membre.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/membre/:membreId", membre.findOne);
    // Update a Customer with customerId
    app.put("/membre/:membreId", membre.update);

    // Delete a Customer with customerId
    app.delete("/membre/:membreId", membre.delete);

    // Create a new Customer
    app.delete("/membre", membre.deleteAll);
    
  };