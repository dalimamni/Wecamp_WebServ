module.exports = app => {
    const profil = require("../controllers/profil.controller.js");
  
    // Create a new Customer
    app.post("/profil", profil.create);
  
    // Retrieve all Customers
    app.get("/profil", profil.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/profil/:profilId", profil.findOne);
    // Update a Customer with customerId
    app.put("/profil/:profilId", profil.update);

    // Delete a Customer with customerId
    app.delete("/profil/:profilId", profil.delete);

    // Create a new Customer
    app.delete("/profil", profil.deleteAll);
    
  };