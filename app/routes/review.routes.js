module.exports = app => {
    const review = require("../controllers/review.controller.js");
  
    // Create a new Customer
    app.post("/review", review.create);
  
    // Retrieve all Customers
    app.get("/review", review.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/review/:reviewId", review.findOne);
    // Update a Customer with customerId
    app.put("/review/:reviewId", review.update);

    // Delete a Customer with customerId
    app.delete("/review/:reviewId", review.delete);

    // Create a new Customer
    app.delete("/review", review.deleteAll);
    
  };