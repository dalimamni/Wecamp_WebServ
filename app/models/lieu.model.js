const sql = require("./db.js");

// constructor
const Lieu = function(lieu) {
  this.idMembre = lieu.idMembre;
  this.nom = lieu.nom;
  this.description = lieu.description;
  this.longitude = lieu.longitude;
  this.latidue = lieu.latidue;
  this.images = lieu.images;
  this.etatValidation = lieu.etatValidation;
};

Lieu.create = (newLieu, result) => {
  sql.query("INSERT INTO lieux SET ?", newLieu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created lieu: ", { id: res.insertIdLieu, ...newLieu });
    result(null, { id: res.insertIdLieu, ...newLieu });
  });
};

Lieu.findById = (lieuId, result) => {
  sql.query(`SELECT * FROM lieux WHERE idLieu = ${lieuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Lieux: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Lieu.getAll = result => {
  sql.query("SELECT * FROM Lieux", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Lieux: ", res);
    result(null, res);
  });
};
Lieu.updateById = (idLieu, lieu, result) => {
  sql.query(
    "UPDATE lieux SET 	idMembre = ?, nom = ?, description = ?, longitude = ?, latidue = ?, images = ?, etatValidation = ? WHERE idLieu = ?",
    [lieu.idMembre, lieu.nom, lieu.description, lieu.longitude, lieu.latidue, lieu.images, lieu.etatValidation, idLieu],
    (err, res) => {
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

      console.log("updated lieu: ", { idLieu: idLieu, ...lieu });
      result(null, { idLieu: idLieu, ...lieu });
    }
  );
};

Lieu.remove = (id, result) => {
  sql.query("DELETE FROM lieux WHERE idLieu = ?", id, (err, res) => {
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

    console.log("deleted lieu with id: ", id);
    result(null, res);
  });
};

Lieu.removeAll = result => {
  sql.query("DELETE FROM lieux", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} lieux`);
    result(null, res);
  });
};

module.exports = Lieu;