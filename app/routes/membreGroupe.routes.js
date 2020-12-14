module.exports = app => {
    const membreGroupe = require("../controllers/membreGroupe.controller.js");
  
    
    app.post("/membreGroupe", membreGroupe.create);
  
    app.get("/membreGroupes/:membreId", membreGroupe.findMembreGroups);
  
    app.get("/membreDuGroupe/:groupeId", membreGroupe.getAllMembres);

	app.get("/isAlreadyMember/:groupeId/:membreId", membreGroupe.isAlreadyMember);    
    
    app.delete("/membreGroupe/:membreId/:groupeId", membreGroupe.removeMembre);

    app.delete("/membreGroupe/:groupeId", membreGroupe.deleteAll);

    app.post("/acceptInvit/:membreId/:groupeId", membreGroupe.acceptInvit);

    app.delete("/declineInvit/:membreId/:groupeId", membreGroupe.declineInvit);
    
  };