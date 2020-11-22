const sql = require("./db.js");

// constructor
const Profil = function(profil) {
  this.idMembre = profil.idMembre;
  this.dateInscrip = profil.dateInscrip;

};

Profil.create = (newProfil, result) => {
  sql.query("INSERT INTO profil SET ?", newProfil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Profil: ", { id: res.insertIdProfil, ...newProfil });
    result(null, { id: res.insertIdProfil, ...newProfil });
  });
};

Profil.findById = (profilId, result) => {
  sql.query(`SELECT * FROM profil WHERE idProfil = ${profilId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found profil: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Profil.getAll = result => {
  sql.query("SELECT * FROM profil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("profil: ", res);
    result(null, res);
  });
};
Profil.updateById = (idProfil, profil, result) => {
  sql.query(
    "UPDATE profil SET idMembre = ?,dateInscrip = ? WHERE idProfil = ?",
    [profil.idMembre, profil.dateInscrip, idProfil],
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

      console.log("updated membre: ", { idProfil: idProfil, ...profil });
      result(null, { idProfil: idProfil, ...profil });
    }
  );
};

Profil.remove = (id, result) => {
  sql.query("DELETE FROM profil WHERE idProfil = ?", id, (err, res) => {
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

Profil.removeAll = result => {
  sql.query("DELETE FROM profil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} profil`);
    result(null, res);
  });
};

module.exports = Profil;