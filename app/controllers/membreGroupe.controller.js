const MembreGroupe = require("../models/membreGroupe.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    const membreGroupe = new MembreGroupe({
      idMembre: req.body.idMembre,
      idGroupe: req.body.idGroupe,
      isConfirmed: req.body.isConfirmed,
    });
  
    // Save group in the database
    MembreGroupe.create(membreGroupe, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the membreGroupe."
        });
      else res.send(data);
    });
};

exports.findMembreGroups = (req, res) => {
    MembreGroupe.findMembreGroups(req.params.membreId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membreGroupe with idMembre ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving membreGroupe with membreId " + req.params.membreId
          });
        }
      } else res.send(data);
    });
};

exports.getAllMembres = (req, res) => {
    MembreGroupe.getAllMembres(req.params.groupeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membreGroupe with idGroupe ${req.params.groupeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving membreGroupe with groupeId " + req.params.groupeId
          });
        }
      } else res.send(data);
    });
};

exports.removeMembre = (req, res) => {
    MembreGroupe.removeMembre(req.params.membreId, req.params.groupeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membreGroupe with idMembre ${req.params.membreId} and idGroupe ${req.params.groupeId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete membreGroupe with membreId " + req.params.membreId + " and groupeId" + req.params.groupeId 
          });
        }
      } else res.send({ message: `membreGroupe was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    MembreGroupe.removeAll(req.params.groupeId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all membreGroupe."
        });
      else res.send({ message: `All group members were deleted successfully!` });
    });
};

exports.acceptInvit = (req, res) => {
    MembreGroupe.acceptInvit(req.params.membreId, req.params.groupeId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while accepting invitation."
        });
      else res.send({ message: `Invitation accepted!` });
    });
};

exports.declineInvit = (req, res) => {
    MembreGroupe.declineInvit(req.params.membreId, req.params.groupeId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while decling invitation."
        });
      else res.send({ message: `Invitation declined!` });
    });
};