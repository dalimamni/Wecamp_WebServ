const sql = require("./db.js");

// constructor
const Membre = function(membre) {
  this.nom = membre.nom;
  this.prenom = membre.prenom;
  this.dateNaissance = membre.dateNaissance;
  this.numTel = membre.numTel;
  this.adresse = membre.adresse;
  this.email = membre.email;
  this.password = membre.password;
  this.photo = membre.photo;
  this.role = membre.role;
  this.score = membre.score;
  this.verified = membre.verified;
};

Membre.create = (newMembre, result) => {
  sql.query("INSERT INTO membre SET ?", newMembre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Membre: ", { id: res.insertIdMembre, ...newMembre });
    result(null, { id: res.insertIdMembre, ...newMembre });
  });
};

Membre.findById = (membreId, result) => {
  sql.query(`SELECT * FROM membre WHERE idMembre = ${membreId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Membre: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Membre.getAll = result => {
  sql.query("SELECT * FROM membre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Membre: ", res);
    result(null, res);
  });
};
Membre.updateById = (idMembre, membre, result) => {
  sql.query(
    "UPDATE membre SET nom = ?, prenom = ?, dateNaissance = ?, numTel = ?, adresse = ?, email = ?, password = ?, photo = ?, role = ?, score = ?, verified = ? WHERE idMembre = ?",
    [membre.nom, membre.prenom, membre.dateNaissance, membre.numTel, membre.adresse, membre.email,membre.password,membre.photo,membre.role,membre.score,membre.verified, idMembre],
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

      console.log("updated membre: ", { idMembre: idMembre, ...membre });
      result(null, { idMembre: idMembre, ...membre });
    }
  );
};

Membre.remove = (id, result) => {
  sql.query("DELETE FROM membre WHERE idMembre = ?", id, (err, res) => {
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

    console.log("deleted membre with id: ", id);
    result(null, res);
  });
};

Membre.removeAll = result => {
  sql.query("DELETE FROM membre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} membre`);
    result(null, res);
  });
};

module.exports = Membre;