const CircuitPoint = require("../models/circuitPoint.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    const circuitPoint = new CircuitPoint({
      idCircuit: req.body.idCircuit,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    });
  
    // Save group in the database
    CircuitPoint.create(circuitPoint, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the circuitPoint."
        });
      else res.send(data);
    });
};

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

exports.findOne = (req, res) => {
    CircuitPoint.findById(req.params.circuitPointId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found circuitPoint with id ${req.params.circuitPointId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving circuitPoint with circuitPointId " + req.params.circuitPointId
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

exports.delete = (req, res) => {
    CircuitPoint.remove(req.params.circuitPointId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found circuitPoint with id ${req.params.circuitPointId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete circuitPoint with circuitPointId " + req.params.circuitPointId
          });
        }
      } else res.send({ message: `CircuitPoint was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    CircuitPoint.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all circuitPoints."
        });
      else res.send({ message: `All circuitPoints were deleted successfully!` });
    });
};