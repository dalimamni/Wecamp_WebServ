module.exports = app => {
    const membreCircuit = require("../controllers/membreCircuit.controller.js");
  
    
    app.post("/membreCircuit", membreCircuit.create);
  
    app.get("/membreCircuit/:membreId", membreCircuit.findByIdMembre);

    app.delete("/membreCircuit/:membreId/:circuitId", membreCircuit.delete);

    app.delete("/membreCircuit", membreCircuit.deleteAll);
    
  };