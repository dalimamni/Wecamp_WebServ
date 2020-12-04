module.exports = app => {
    const circuitPoint = require("../controllers/circuitPoint.controller.js");
  
    
    app.post("/circuitPoint", circuitPoint.create);
  
    app.get("/circuitPoint", circuitPoint.findAll);

    app.get("/circuitPoints/:circuitId", circuitPoint.findAllCircuitPoints);
  
    app.get("/circuitPoint/:circuitPointId", circuitPoint.findOne);
    
    app.put("/circuitPoint/:circuitPointId", circuitPoint.update);

    app.delete("/circuitPoint/:circuitPointId", circuitPoint.delete);

    app.delete("/circuitPoint/:circuitId", circuitPoint.deleteAllCircuitPoints);

    app.delete("/circuitPoint", circuitPoint.deleteAll);
    
  };