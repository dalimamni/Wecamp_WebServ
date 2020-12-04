const sql = require("./db.js");


const CircuitPoint = function(circuitPoint) {
  this.idCircuit = circuitPoint.idCircuit;
  this.longitude = circuitPoint.longitude;
  this.latitude = circuitPoint.latitude;
  this.ordre = circuitPoint.ordre;
  };

CircuitPoint.create = (newCircuitPoint, result) => {
  sql.query("INSERT INTO circuitPoint SET ?", newCircuitPoint, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created circuitPoint: ", { id: res.insertIdCircuitPoint, ...newCircuitPoint });
    result(null, { id: res.insertIdCircuitPoint, ...newCircuitPoint });
  });
};

CircuitPoint.findById = (circuitPointId, result) => {
  sql.query(`SELECT * FROM circuitPoint WHERE idCircuitPoint = ${circuitPointId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found circuitPoints: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};



CircuitPoint.findAllCircuitPoints = (circuitId, result) => {
  sql.query(`SELECT * FROM circuitPoint WHERE idCircuit = ${circuitId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found circuitPoints: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

CircuitPoint.deleteAllCircuitPoints = (circuitId, result) => {
  sql.query(`DELETE FROM circuitPoint WHERE idCircuit = ${circuitId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found circuitPoints: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

CircuitPoint.getAll = result => {
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

CircuitPoint.remove = (idCircuitPoint, result) => {
  sql.query("DELETE FROM circuitPoint WHERE idCircuitPoint = ?", idCircuitPoint, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted circuitPoint with id: ", idCircuitPoint);
    result(null, res);
  });
};

CircuitPoint.removeAll = result => {
  sql.query("DELETE FROM circuitPoint", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} circuitPoints`);
    result(null, res);
  });
};

module.exports = CircuitPoint;