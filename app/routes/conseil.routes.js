module.exports = app => {
    const conseil = require("../controllers/conseil.controller.js");
  
    // Create a new Customer
    app.post("/conseil", conseil.create);
  
    // Retrieve all Customers
    app.get("/conseil", conseil.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/conseil/:conseilId", conseil.findOne);

    app.get("/conseil_lieu/:lieuId", conseil.findByIdLieu);

    app.get("/conseil_circuit/:circuitId", conseil.findByIdCircuit);
    // Update a Customer with customerId
    app.put("/conseil/:conseilId", conseil.update);

    app.put("/conseil_addlike/:conseilId", conseil.addLike);

    app.put("/conseil_adddislike/:conseilId", conseil.addDislike);

    // Delete a Customer with customerId
    app.delete("/conseil/:conseilId", conseil.delete);

    // Create a new Customer
    app.delete("/conseil", conseil.deleteAll);
    
  };