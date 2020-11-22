module.exports = app => {
    const groupe = require("../controllers/groupe.controller.js");
  
    
    app.post("/groupe", groupe.create);
  
    app.get("/groupe", groupe.findAll);
  
    app.get("/groupe/:groupeId", groupe.findOne);
    
    app.put("/groupe/:groupeId", groupe.update);

    app.delete("/groupe/:groupeId", groupe.delete);

    app.delete("/groupe", groupe.deleteAll);
    
  };