const Groupe = require("../models/groupe.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a group
    const groupe = new Groupe({
      idMembre: req.body.idMembre,
      nom: req.body.nom,
      slogan: req.body.slogan,
      image: req.body.image
    });
  
    // Save group in the database
    Groupe.create(groupe, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the group."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Groupe.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving groups."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Groupe.findById(req.params.groupeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found group with id ${req.params.groupeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving groupe with idGroupe " + req.params.groupeId
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
  
    Groupe.updateById(
      req.params.groupeId,
      new Groupe(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found groupe with id ${req.params.groupeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating groupe with idGroupe " + req.params.groupeId
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    Groupe.remove(req.params.groupeId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found groupe with id ${req.params.groupeId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete groupe with idGroupe " + req.params.groupeId
          });
        }
      } else res.send({ message: `Groupe was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Groupe.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all groupes."
        });
      else res.send({ message: `All groups were deleted successfully!` });
    });
};