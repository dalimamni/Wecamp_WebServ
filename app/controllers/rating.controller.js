const Rating = require("../models/rating.model.js");


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