const sql = require("./db.js");


const MembreCircuit = function(membreCircuit) {
  this.idCircuit = membreCircuit.idCircuit;
  this.idMembre = membreCircuit.idMembre;
  this.date = membreCircuit.date;
  };

MembreCircuit.create = (newMembreCircuit, result) => {
  sql.query("INSERT INTO membreCircuit SET ?", newMembreCircuit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created membreCircuit: ", { id: res.insertIdMembreCircuit, ...newMembreCircuit });
    result(null, { id: res.insertIdMembreCircuit, ...newMembreCircuit });
  });
};

MembreCircuit.findByIdMembre = (membreId, result) => {
  sql.query(`SELECT * FROM membreCircuit WHERE idMembre = ${membreId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found membreCircuit: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

/*
MembreCircuit.getAll = result => {
  sql.query("SELECT * FROM circuitPoint", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("CircuitPoint: ", res);
    result(null, res);
  });
};


CircuitPoint.updateById = (idCircuitPoint, circuitPoint, result) => {
  sql.query(
    "UPDATE circuitPoint SET longitude = ?, latitude= ? WHERE idCircuitPoint = ?",
    [circuitPoint.longitude, circuitPoint.latitude,  idCircuitPoint],
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

      console.log("updated circuitPoint: ", { idCircuitPoint: idCircuitPoint, ...circuitPoint });
      result(null, { idCircuitPoint: idCircuitPoint, ...circuitPoint });
    }
  );
};
*/

MembreCircuit.remove = (idMembre, idCircuit, result) => {
  sql.query("DELETE FROM membreCircuit WHERE idMembre = ? AND idCircuit = " + idCircuit, idMembre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted membreCircuit with idMembre: ", idMembre, " and idCircuit: ", idCircuit);
    result(null, res);
  });
};

MembreCircuit.removeAll = result => {
  sql.query("DELETE FROM membreCircuit", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} membreCircuit`);
    result(null, res);
  });
};

module.exports = MembreCircuit;