const sql = require("./db.js");


const Groupe = function(groupe) {
  this.idMembre = groupe.idMembre;
  this.nom = groupe.nom;
  this.slogan = groupe.slogan;
  this.image = groupe.image;
};

Groupe.create = (newGroupe, result) => {
  sql.query("INSERT INTO groupe SET ?", newGroupe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created groupe: ", { id: res.insertIdGroupe, ...newGroupe });
    result(null, { id: res.insertIdGroupe, ...newGroupe });
  });
};

Groupe.findById = (groupeId, result) => {
  sql.query(`SELECT * FROM groupe WHERE idGroupe = ${groupeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found groupes: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Groupe.getAll = result => {
  sql.query("SELECT * FROM groupe", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Groupe: ", res);
    result(null, res);
  });
};

Groupe.updateById = (idGroupe, groupe, result) => {
  sql.query(
    "UPDATE groupe SET nom = ?, slogan = ?, image = ? WHERE idGroupe = ?",
    [groupe.nom, groupe.slogan, groupe.image, idGroupe],
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

      console.log("updated groupe: ", { idGroupe: idGroupe, ...groupe });
      result(null, { idGroupe: idGroupe, ...groupe });
    }
  );
};

Groupe.remove = (idGroupe, result) => {
  sql.query("DELETE FROM groupe WHERE idGroupe = ?", idGroupe, (err, res) => {
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

    console.log("deleted groupe with id: ", idGroupe);
    result(null, res);
  });
};

Groupe.removeAll = result => {
  sql.query("DELETE FROM groupe", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} groupes`);
    result(null, res);
  });
};

module.exports = Groupe;