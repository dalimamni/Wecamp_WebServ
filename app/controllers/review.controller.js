const Review = require("../models/review.model.js");


exports.create = (req, res) => {
  
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const review = new Review({
      idMembre: req.body.idMembre,
      contenu: req.body.contenu,
      idLieu: req.body.idLieu,
      idCircuit: req.body.idCircuit,
      

    });
  
 
    Review.create(review, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Membre."
        });
      else res.send(data);
    });
  };

exports.findAll = (req, res) => {
    Review.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Membre."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Review.findById(req.params.reviewId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found membre with id ${req.params.reviewId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving mmebre with idmembre " + req.params.reviewId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdMembre = (req, res) => {
    Review.findByIdMembre(req.params.membreId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found review with idMembre ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with idMembre " + req.params.membreId
          });
        }
      } else res.send(data);
    });
  };


exports.findByIdLieu = (req, res) => {
    Review.findByIdLieu(req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found review with idLieu ${req.params.lieuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with idLieu " + req.params.lieuId
          });
        }
      } else res.send(data);
    });
  };

  

exports.findByIdCircuit = (req, res) => {
    Review.findByIdCircuit(req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found review with idLieu ${req.params.circuitId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with idLieu " + req.params.circuitId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdMembreAndIdLieu = (req, res) => {
    Review.findByIdMembreAndIdLieu(req.params.membreId, req.params.lieuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found review with idLieu ${req.params.lieuId} And idMembre ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with idLieu " + req.params.circuitId + "And idMembre" req.params.membreId
          });
        }
      } else res.send(data);
    });
  };

exports.findByIdMembreAndIdCircuit = (req, res) => {
    Review.findByIdMembreAndIdCircuit(req.params.membreId, req.params.circuitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found review with idCircuit ${req.params.circuitId} And idMembre ${req.params.membreId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with idCircuit " + req.params.circuitId + "And idMembre" req.params.membreId
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
  
    Review.updateById(
      req.params.reviewId,
      new Review(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found membre with id ${req.params.reviewId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating membre with id " + req.params.reviewId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Review.remove(req.params.reviewId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.reviewId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.reviewId
          });
        }
      } else res.send({ message: `membre was deleted successfully!` });
    });
  };

exports.deleteAll = (req, res) => {
    Review.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };