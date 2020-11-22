const sql = require("./db.js");


const Circuit = function(circuit) {
  this.idLieu = circuit.idLieu;
  this.idMembre = circuit.idMembre;
  this.nomCircuit = circuit.nomCircuit;
  this.difficulte = circuit.difficulte;
  this.duree = circuit.duree;
  this.longitude = circuit.longitude;
  this.latitude = circuit.latitude;
};

Circuit.create = (newCircuit, result) => {
  sql.query("INSERT INTO circuit SET ?", newCircuit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created circuit: ", { id: res.insertIdCircuit, ...newCircuit });
    result(null, { id: res.insertIdCircuit, ...newCircuit });
  });
};

Circuit.findById = (circuitId, result) => {
  sql.query(`SELECT * FROM circuit WHERE idCircuit = ${circuitId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found circuit: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

Circuit.getAll = result => {
  sql.query("SELECT * FROM circuit", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Circuit: ", res);
    result(null, res);
  });
};

Circuit.updateById = (idCircuit, circuit, result) => {
  sql.query(
    "UPDATE circuit SET difficulte = ?, nomCircuit= ? WHERE idCircuit = ?",
    [circuit.difficulte, circuit.nomCircuit, idCircuit],
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

      console.log("updated circuit: ", { idCircuit: idCircuit, ...circuit });
      result(null, { idCircuit: idCircuit, ...circuit });
    }
  );
};

Circuit.remove = (idCircuit, result) => {
  sql.query("DELETE FROM circuit WHERE idCircuit = ?", idCircuit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted circuit with id: ", idCircuit);
    result(null, res);
  });
};

Circuit.removeAll = result => {
  sql.query("DELETE FROM circuit", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} circuits`);
    result(null, res);
  });
};

module.exports = Circuit;