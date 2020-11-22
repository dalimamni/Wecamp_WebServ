module.exports = app => {
    const rating = require("../controllers/rating.controller.js");
  
    // Create a new Customer
    app.post("/rating", rating.create);
  
    // Retrieve all Customers
    app.get("/rating", rating.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/rating/:ratingId", rating.findOne);
    // Update a Customer with customerId
    app.put("/rating/:ratingId", rating.update);

    // Delete a Customer with customerId
    app.delete("/rating/:ratingId", rating.delete);

    // Create a new Customer
    app.delete("/rating", rating.deleteAll);
    
  };