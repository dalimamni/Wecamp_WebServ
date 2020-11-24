module.exports = app => {
    const rating = require("../controllers/rating.controller.js");
  
    // Create a new Customer
    app.post("/rating", rating.create);
  
    // Retrieve all Customers
    app.get("/rating", rating.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/rating/:ratingId", rating.findOne);

    app.get("/membre_rating/:membreId", rating.findByIdMembre);

    app.get("/lieu_rating/:lieuId", rating.findByIdLieu);

    app.get("/circuit_rating/:circuitId", rating.findByIdCircuit);

    app.get("/lieu_moy_rating/:lieuId", rating.moyRatingLieu);

    app.get("/circuit_moy_rating/:cirucitId", rating.moyRatingCircuit);

    app.get("/membre_lieu_rating/:lieuId/:membreId", rating.findByIdMembreAndIdLieu);

    app.get("/membre_circuit_rating/:lieuId/:circuitId", rating.findByIdMembreAndIdCircuit);

    // Update a Customer with customerId
    app.put("/rating/:ratingId", rating.update);

    // Delete a Customer with customerId
    app.delete("/rating/:ratingId", rating.delete);

    // Create a new Customer
    app.delete("/rating", rating.deleteAll);
    
  };