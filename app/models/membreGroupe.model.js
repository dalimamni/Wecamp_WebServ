const sql = require("./db.js");


const MembreGroupe = function(membreGroupe) {
  this.idMembre = membreGroupe.idMembre;
  this.idGroupe = membreGroupe.idGroupe;
  this.isConfirmed = membreGroupe.isConfirmed;
};

MembreGroupe.create = (newMembreGroupe, result) => {
  sql.query("INSERT INTO membreGroupe SET ?", newMembreGroupe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created membreGroupe: ", { id: res.insertIdMembreGroupe, ...newMembreGroupe });
    result(null, { id: res.insertIdMembreGroupe, ...newMembreGroupe });
  });
};

MembreGroupe.findMembreGroups = (membreId, result) => {
  sql.query(`SELECT * FROM membreGroupe WHERE idMembre = ${membreId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found membreGroupe: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

MembreGroupe.getAllMembres = (groupeId, result )=> {
  sql.query(`SELECT * FROM membreGroupe WHERE idGroupe = ${groupeId}` , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("MembreGroupe: ", res);
    result(null, res);
  });
};


MembreGroupe.removeMembre = (idMembre, idGroupe, result) => {
  sql.query(`DELETE FROM membreGroupe WHERE idMembre = ${idMembre} AND idGroupe = ${idGroupe}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted membreGroupe with idMembre: ", idMembre, " and idGroupe: ", idGroupe);
    result(null, res);
  });
};

MembreGroupe.removeAll = (idGroupe, result) => {
  sql.query("DELETE FROM membreGroupe WHERE idGroupe = ? ", idGroupe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} groupeMembres`);
    result(null, res);
  });
};

MembreGroupe.acceptInvit = (idMembre, idGroupe, result) => {
  sql.query("UPDATE membreGroupe SET isConfirmed = 1 WHERE idGroupe = ? AND idMembre = ?", [idGroupe, idMembre], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Invitation accepted for member ${idMembre} and group ${idGroupe}`);
    result(null, res);
  });
};

MembreGroupe.declineInvit = (idMembre, idGroupe, result) => {
  sql.query("DELETE FROM membreGroupe WHERE idGroupe = ? AND idMembre = ? ", [idGroupe, idMembre], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Invitation declined for member ${idMembre} and group ${idGroupe}`);
    result(null, res);
  });
};

module.exports = MembreGroupe;