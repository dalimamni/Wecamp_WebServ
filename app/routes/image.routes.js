module.exports = app => {
    const image = require("../controllers/image.controller.js");
  
    
    app.post("/image", image.create);
  
    app.get("/image", image.findAll);
  
    app.get("/image/:imageId", image.findOne);
    
    app.put("/image/:imageId", image.update);

    app.delete("/image/:imageId", image.delete);

    app.delete("/image", image.deleteAll);
    
  };