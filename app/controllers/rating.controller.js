const Rating = require("../models/rating.model.js");


exports.create = (req, res) => {
  
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const rating = new Rating({
      idMembre: req.body.idMembre,
      nbEtoile: req.body.nbEtoile,
      idLieu: req.body.idLieu,
      idCircuit: req.body.idCircuit,
      

    });
  
 
    Rating.create(rating, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Membre."
        });
      else res.send(data);
    });
  };
  exports.findAll = (req, res) => {
    Rating.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Membre."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    Rating.findById(req.params.ratingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with id ${req.params.ratingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idrating " + req.params.ratingId
          });
        }
      } else res.send(data);
    });
  };

  exports.findByIdMembre = (req, res) => {
    Rating.findByIdMembre(req.params.membreId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with id ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idrating " + req.params.membreId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdMembreAndIdLieu = (req, res) => {
    Rating.findByIdMembreAndIdLieu(req.params.membreId, req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with idMembre ${req.params.membreId} And idLieu ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idMembre " + req.params.membreId + " and idLieu " + req.params.lieuId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdMembreAndIdCircuit = (req, res) => {
    Rating.findByIdMembreAndIdCircuit(req.params.membreId, req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with idMembre ${req.params.membreId} And idLieu ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idMembre " + req.params.membreId + " and idLieu " + req.params.circuitId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdLieu = (req, res) => {
    Rating.findByIdLieu(req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with id ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idrating " + req.params.lieuId
          });
        }
      } else res.send(data);
    });
  };


exports.findByIdCircuit = (req, res) => {
    Rating.findByIdCircuit(req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with id ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idrating " + req.params.circuitId
          });
        }
      } else res.send(data);
    });
  };

exports.moyRatingLieu = (req, res) => {
    Rating.moyRatingLieu(req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with id ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idrating " + req.params.lieuId
          });
        }
      } else res.send(data);
    });
  };
  exports.moyRatingCircuit = (req, res) => {
    Rating.moyRatingCircuit(req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found rating with id ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idrating " + req.params.circuitId
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
  
    Rating.updateById(
      req.params.ratingId,
      new Rating(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Rating with id ${req.params.ratingId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Rating with id " + req.params.ratingId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Rating.remove(req.params.ratingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.ratingId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.ratingId
          });
        }
      } else res.send({ message: `rating was deleted successfully!` });
    });
  };
  exports.deleteAll = (req, res) => {
    Rating.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };