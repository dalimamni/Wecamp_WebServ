const sql = require("./db.js");

// constructor
const Review = function(review) {
  this.idMembre = review.idMembre;
  this.contenu = review.contenu;
  this.idLieu = review.idLieu;
  this.idCircuit = review.idCircuit;

};

Review.create = (newReview, result) => {
  sql.query("INSERT INTO review SET ?", newReview, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Review: ", { id: res.insertIdReview, ...newReview });
    result(null, { id: res.insertIdReview, ...newReview });
  });
};

Review.findById = (reviewId, result) => {
  sql.query(`SELECT * FROM review WHERE idReview = ${reviewId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Review.getAll = result => {
  sql.query("SELECT * FROM review", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Review: ", res);
    result(null, res);
  });
};
Review.updateById = (idReview, review, result) => {
  sql.query(
    "UPDATE review SET idMembre = ?, contenu = ?, idLieu = ?, idCircuit = ? WHERE idReview = ?",
    [review.idMembre, review.contenu, review.idLieu, review.idCircuit, idReview],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
       
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated membre: ", { idReview: idReview, ...review });
      result(null, { idReview: idReview, ...review });
    }
  );
};

Review.remove = (id, result) => {
  sql.query("DELETE FROM review WHERE idReview = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted review with id: ", id);
    result(null, res);
  });
};

Review.removeAll = result => {
  sql.query("DELETE FROM review", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} review`);
    result(null, res);
  });
};

module.exports = Review;