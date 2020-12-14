const sql = require("./db.js");
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wecamp.app.contact@gmail.com',
    pass: 'weCamp123'
  }
});

const MembreGroupe = function(membreGroupe) {
  this.idMembre = membreGroupe.idMembre;
  this.idGroupe = membreGroupe.idGroupe;
  this.isConfirmed = membreGroupe.isConfirmed;
};

function sendInvitationInformEmail(email, nomGroup)
{
  var mailOptions = {
    from: 'wecamp.app.contact@gmail.com',
    to: email,
    subject: 'Invitaion pour rejoindre un groupe',
    html: "<p>Vous avez été inviter pour rejoindre le groupe : " + nomGroup + ".</p>"
  };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) 
  {
    console.log(error);
  } 
  else 
  {
    console.log('Email sent: ' + info.response);
  }
  });
}

MembreGroupe.create = (newMembreGroupe, result) => {
  sql.query("INSERT INTO membreGroupe SET ?", newMembreGroupe, (err, res) => {
    
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      sql.query(`SELECT nom FROM groupe WHERE idGroupe = ${newMembreGroupe.idGroupe} `, (err2, res2) => {
      if (err2) {
        console.log("error: ", err2);
        result(err2, null);
        return;
      }
      sql.query(`SELECT email FROM membre WHERE idMembre = ${newMembreGroupe.idMembre}`, (err3, res3) => {
          if (err3) {
            console.log("error: ", err3);
            result(err3, null);
            return;
          }
          sendInvitationInformEmail(res3[0]['email'], res2[0]['nom'])
              
          console.log(null, { email : res3[0] });
      });
      
      console.log(null, {nomGroup : res2[0] });
     });
      
    
    console.log("created membreGroupe: ", { id: res.insertId, ...newMembreGroupe });
    result(null, { id: res.insertId, ...newMembreGroupe });
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
      console.log("found membreGroupe: ", {res});
      result(null, {res});
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

MembreGroupe.isAlreadyMember = (groupeId, membreId, result) => {
  sql.query(`SELECT * FROM membreGroupe WHERE idMembre = ${membreId} AND idGroupe = ${groupeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found membreGroupe: ", {res});
      result(null, {res});
      return;
    }
    result(null, { res: "not_found" });
  });
};

MembreGroupe.getAllMembres = (groupeId, result )=> {
  sql.query(`SELECT * FROM membreGroupe WHERE idGroupe = ${groupeId}` , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("MembreGroupe: ", {res});
    result(null, {res});
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