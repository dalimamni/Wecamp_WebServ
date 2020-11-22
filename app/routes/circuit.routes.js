module.exports = app => {
    const circuit = require("../controllers/circuit.controller.js");
  
    
    app.post("/circuit", circuit.create);
  
    app.get("/circuit", circuit.findAll);
  
    app.get("/circuit/:circuitId", circuit.findOne);
    
    app.put("/circuit/:circuitId", circuit.update);

    app.delete("/circuit/:circuitId", circuit.delete);

    app.delete("/circuit", circuit.deleteAll);
    
  };