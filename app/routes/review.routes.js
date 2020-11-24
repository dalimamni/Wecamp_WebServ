module.exports = app => {
    const review = require("../controllers/review.controller.js");
  
    // Create a new Customer
    app.post("/review", review.create);
  
    // Retrieve all Customers
    app.get("/review", review.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/review/:reviewId", review.findOne);

    app.get("/membre_reviews/:membreId", review.findByIdMembre);

    app.get("/lieu_reviews/:lieuId", review.findByIdLieu);

    app.get("/circuit_reviews/:circuitId", review.findByIdCircuit);

    app.get("/membre_lieu_reviews/:lieuId/:membreId", review.findByIdMembreAndIdLieu);

    app.get("/membre_lieu_reviews/:circuitId/:membreId", review.findByIdMembreAndIdCircuit);
    
    // Update a Customer with customerId
    app.put("/review/:reviewId", review.update);

    // Delete a Customer with customerId
    app.delete("/review/:reviewId", review.delete);

    // Create a new Customer
    app.delete("/review", review.deleteAll);
    
  };