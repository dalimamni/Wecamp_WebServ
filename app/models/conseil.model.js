const sql = require("./db.js");

// constructor
const Conseil = function(conseil) {
  this.idLieu = conseil.idLieu;
  this.idMembre = conseil.idMembre;
  this.contenu = conseil.contenu;
  this.nbLike = conseil.nbLike;
  this.nbDislike = conseil.nbDislike;

};

Conseil.create = (newConseil, result) => {
  sql.query("INSERT INTO conseil SET ?", newConseil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Review: ", { id: res.insertIdConseil, ...newConseil });
    result(null, { id: res.insertId, ...newConseil });
  });
};

Conseil.findById = (conseilId, result) => {
  sql.query(`SELECT * FROM conseil WHERE idConseil = ${conseilId}`, (err, res) => {
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

Conseil.findByIdLieu = (lieuId, result) => {
  sql.query(`SELECT * FROM conseil WHERE idLieu = ${lieuId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Conseil: ", res);
      result(null, {res});
      return;
    }
    
    result(null,{ res: "not_found" });
  });
};

Conseil.findByIdCircuit = (circuitId, result) => {
  sql.query(`SELECT * FROM conseil WHERE idCircuit = ${circuitId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Review: ", res);
      result(null, {res});
      return;
    }
    
    result(null, { res: "not_found" });
  });
};


Conseil.getAll = result => {
  sql.query("SELECT * FROM conseil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Review: ", res);
    result(null, res);
  });
};

Conseil.updateById = (idConseil, conseil, result) => {
  sql.query(
    "UPDATE conseil SET idLieu = ?, idMembre = ?, contenu = ?, nbLike = ? , nbDislike = ? WHERE idConseil = ?",
    [conseil.idLieu, conseil.idMembre, conseil.contenu, conseil.nbLike, conseil.nbDislike, idConseil],
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

      console.log("updated membre: ", { idConseil: idConseil, ...conseil });
      result(null, { idConseil: idConseil, ...conseil });
    }
  );
};

Conseil.addLike = (idConseil, result) => {
  sql.query(
    "UPDATE conseil SET  nbLike = nbLike + 1 WHERE idConseil = ?",
    [idConseil],
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

      console.log("updated conseil: ");
      result(null, {res : "updated conseil"});
    }
  );
};

Conseil.addDislike = (idConseil, result) => {
  sql.query(
    "UPDATE conseil SET  nbDislike = nbDislike + 1 WHERE idConseil = ?",
    [idConseil],
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

      console.log("updated conseil: ");
      result(null, {res : "updated conseil"});
    }
  );
};

Conseil.remove = (id, result) => {
  sql.query("DELETE FROM conseil WHERE idConseil = ?", id, (err, res) => {
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

Conseil.removeAll = result => {
  sql.query("DELETE FROM conseil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} conseil`);
    result(null, res);
  });
};

module.exports = Conseil;