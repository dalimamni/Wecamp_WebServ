const MembreCircuit = require("../models/membreCircuit.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    const membreCircuit = new MembreCircuit({
      idCircuit: req.body.idCircuit,
      idMembre: req.body.idMembre,
      date: req.body.date
    });
  
    
    MembreCircuit.create(membreCircuit, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the membreCircuit."
        });
      else res.send(data);
    });
};
/*
exports.findAll = (req, res) => {
    CircuitPoint.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving circuitPoints."
        });
      else res.send(data);
    });
};
*/
exports.findByIdMembre = (req, res) => {
    MembreCircuit.findByIdMembre(req.params.membreId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membreId with id ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving circuitPoint with membreId " + req.params.membreId
          });
        }
      } else res.send(data);
    });
};
/*
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    CircuitPoint.updateById(
      req.params.circuitPointId,
      new CircuitPoint(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found circuitPoint with id ${req.params.circuitPointId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating circuitPoint with circuitPointId " + req.params.circuitPointId
            });
          }
        } else res.send(data);
      }
    );
};
*/
exports.delete = (req, res) => {
    MembreCircuit.remove(req.params.membreId, req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membreCircuit with idMembre ${req.params.membreId} and idCircuit ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete membreCircuit with membreId " + req.params.membreId + " and circuitId " + req.params.membreId
          });
        }
      } else res.send({ message: `MembreCircuit was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MembreCircuit.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all membreCircuit."
        });
      else res.send({ message: `All membreCircuit were deleted successfully!` });
    });
};