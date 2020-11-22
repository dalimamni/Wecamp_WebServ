const Circuit = require("../models/circuit.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a group
    const circuit = new Circuit({
      idLieu: req.body.idLieu,
      idMembre: req.body.idMembre,
      nomCircuit: req.body.nomCircuit,
      difficulte: req.body.difficulte,
      duree: req.body.duree,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    });
  
    // Save group in the database
    Circuit.create(circuit, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the circuit."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Circuit.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving circuits."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Circuit.findById(req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found circuit with id ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving circuit with circuitId " + req.params.circuitId
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
  
    Circuit.updateById(
      req.params.circuitId,
      new Circuit(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found circuit with id ${req.params.circuitId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating groupe with idGroupe " + req.params.circuitId
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    Circuit.remove(req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found circuit with id ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete circuit with idCircuit " + req.params.circuitId
          });
        }
      } else res.send({ message: `Circuit was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Circuit.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all circuits."
        });
      else res.send({ message: `All circuits were deleted successfully!` });
    });
};