const Lieu = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  
};
// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const lieu = new Lieu({
      idMembre: req.body.idMembre,
      nom: req.body.nom,
      description: req.body.description,
      longitude: req.body.longitude,
      latidue: req.body.latidue,
      images: req.body.images,
      etatValidation: req.body.etatValidation

    });
  
    // Save Customer in the database
    Lieu.create(lieu, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the lieu."
        });
      else res.send(data);
    });
  };
  exports.findAll = (req, res) => {
    Lieu.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lieux."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    Lieu.findById(req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found lieu with id ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving lieu with idLieu " + req.params.lieuId
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
  
    Lieu.updateById(
      req.params.lieuId,
      new Lieu(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found lieu with id ${req.params.lieuId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating lieu with id " + req.params.lieuId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Lieu.remove(req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.lieuId
          });
        }
      } else res.send({ message: `lieu was deleted successfully!` });
    });
  };
  exports.deleteAll = (req, res) => {
    Lieu.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };