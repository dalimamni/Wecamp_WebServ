const Conseil = require("../models/conseil.model.js");

exports.create = (req, res) => {
  
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const conseil = new Conseil({
      idLieu: req.body.idLieu,
      idMembre: req.body.idMembre,
      contenu: req.body.contenu,
      nbLike: req.body.nbLike,
      nbDislike: req.body.nbDislike,
      

    });
  
 
    Conseil.create(conseil, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Membre."
        });
      else res.send(data);
    });
  };
  exports.findAll = (req, res) => {
    Conseil.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Membre."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Conseil.findById(req.params.conseilId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membre with id ${req.params.conseilId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idmembre " + req.params.conseilId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdLieu = (req, res) => {
    Conseil.findByIdLieu(req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found conseil with idLieu ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving conseil with idLieu " + req.params.lieuId
          });
        }
      } else res.send(data);
    });
  };

  

exports.findByIdCircuit = (req, res) => {
    Conseil.findByIdCircuit(req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found conseil with idLieu ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving conseil with idLieu " + req.params.circuitId
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
  
    Conseil.updateById(
      req.params.conseilId,
      new Conseil(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found membre with id ${req.params.conseilId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating membre with id " + req.params.conseilId
            });
          }
        } else res.send(data);
      }
    );
  };

exports.addLike = (req, res) => {
    Conseil.addLike(req.params.conseilId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found conseil with idConseil ${req.params.conseilId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving conseil with idConseil " + req.params.conseilId
          });
        }
      } else res.send(data);
    });
};

exports.addDislike = (req, res) => {
    Conseil.addDislike(req.params.conseilId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found conseil with idConseil ${req.params.conseilId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving conseil with idConseil " + req.params.conseilId
          });
        }
      } else res.send(data);
    });
};


  exports.delete = (req, res) => {
    Conseil.remove(req.params.conseilId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.conseilId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.conseilId
          });
        }
      } else res.send({ message: `membre was deleted successfully!` });
    });
  };
  exports.deleteAll = (req, res) => {
    Conseil.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };