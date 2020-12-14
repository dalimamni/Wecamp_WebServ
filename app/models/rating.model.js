const sql = require("./db.js");

// constructor
const Rating = function(rating) {
  this.idMembre = rating.idMembre;
  this.nbEtoile = rating.nbEtoile;
  this.idLieu = rating.idLieu;
  this.idCircuit = rating.idCircuit;

};

Rating.create = (newRating, result) => {
  sql.query("INSERT INTO rating SET ?", newRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created rating: ", { id: res.insertIdRating, ...newRating});
    result(null, { id: res.insertIdRating, ...newRating });
  });
  sql.query("UPDATE membre SET score = score + 20 WHERE idMembre = ?", newRating.idMembre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("score updated: ");
  });
};

Rating.findById = (ratingId, result) => {
  sql.query(`SELECT * FROM rating WHERE idRating = ${ratingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
//find by member ID 
Rating.findByIdMembre = (membreId, result) => {
  sql.query(`SELECT * FROM rating WHERE idMembre = ${membreId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
// find by member id and lieu id
Rating.findByIdMembreAndIdLieu = (membreId, lieuId, result) => {
  sql.query(`SELECT * FROM rating WHERE idMembre = ${membreId} AND idLieu = ${lieuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Rating.findByIdMembreAndIdCircuit = (membreId, circuitId, result) => {
  sql.query(`SELECT * FROM rating WHERE idMembre = ${membreId} AND idCiruict = ${circuitId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
// find By lieuId
Rating.findByIdLieu = (lieuId, result) => {
  sql.query(`SELECT * FROM rating WHERE idLieu = ${lieuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
// find By circuitId
Rating.findByIdCircuit = (circuitId, result) => {
  sql.query(`SELECT * FROM rating WHERE idCircuit = ${circuitId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
//moy des rating d'un lieu
Rating.moyRatingLieu = (lieuId, result) => {
  sql.query(`SELECT SUM(nbEtoile) FROM rating WHERE idLieu = ${lieuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]/res.length);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

//moy des rating d'un circuit
Rating.moyRatingCircuit = (ciruictId, result) => {
  sql.query(`SELECT SUM(nbEtoile) FROM rating WHERE idCiruict = ${lieuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Rating: ", res[0]);
      result(null, res[0]/res.length);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
Rating.getAll = result => {
  sql.query("SELECT * FROM rating", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Rating: ", res);
    result(null, res);
  });
};
Rating.updateById = (idRating, rating, result) => {
  sql.query(
    "UPDATE rating SET idMembre = ?, nbEtoile = ?, idLieu = ?, idCircuit = ? WHERE idRating = ?",
    [rating.idMembre, rating.nbEtoile, rating.idLieu, rating.idCircuit, idRating],
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

      console.log("updated rating: ", { idRating: idRating, ...rating });
      result(null, { idRating: idRating, ...rating });
    }
  );
};

Rating.remove = (id, result) => {
  sql.query("DELETE FROM rating WHERE idRating = ?", id, (err, res) => {
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

    console.log("deleted rating with id: ", id);
    result(null, res);
  });
};

Rating.removeAll = result => {
  sql.query("DELETE FROM rating", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} rating`);
    result(null, res);
  });
};

module.exports = Rating;