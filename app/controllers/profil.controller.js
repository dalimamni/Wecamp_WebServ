const Profil = require("../models/profil.model.js");


exports.create = (req, res) => {
  
};


exports.findAll = (req, res) => {
  
};


exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};


exports.delete = (req, res) => {
  
};


exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
  
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const profil = new Profil({
      idMembre: req.body.idMembre,
      dateInscrip: req.body.dateInscrip,
      

    });
  
 
    Profil.create(profil, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Membre."
        });
      else res.send(data);
    });
  };
  exports.findAll = (req, res) => {
    Profil.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Membre."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    Profil.findById(req.params.profilId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membre with id ${req.params.profilId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idmembre " + req.params.profilId
          });
        }
      } else res.send(data);
    });
  };
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Profil.updateById(
      req.params.profilId,
      new Profil(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found membre with id ${req.params.profilId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating membre with id " + req.params.profilId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Profil.remove(req.params.profilId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.profilId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.profilId
          });
        }
      } else res.send({ message: `membre was deleted successfully!` });
    });
  };
  exports.deleteAll = (req, res) => {
    Profil.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };