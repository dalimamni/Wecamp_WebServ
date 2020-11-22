const sql = require("./db.js");


const Image = function(image) {
  this.idLieu = image.idLieu;
  this.idMembre = image.idMembre;
  this.img = image.img;
  this.validation = image.validation;
  this.nbValidation = image.nbValidation;
 };

Image.create = (newImage, result) => {
  sql.query("INSERT INTO image SET ?", newImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created image: ", { id: res.insertIdImage, ...newImage });
    result(null, { id: res.insertIdImage, ...newImage });
  });
};

Image.findById = (imageId, result) => {
  sql.query(`SELECT * FROM image WHERE idImage = ${imageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found images: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

Image.getAll = result => {
  sql.query("SELECT * FROM image", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Image: ", res);
    result(null, res);
  });
};

Image.updateById = (idImage, image, result) => {
  sql.query(
    "UPDATE image SET img = ?, validation= ?, nbValidation = ? WHERE idImage = ?",
    [image.img, image.validation, image.nbValidation, idImage],
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

      console.log("updated image: ", { idImage: idImage, ...image });
      result(null, { idImage: idImage, ...image });
    }
  );
};

Image.remove = (idImage, result) => {
  sql.query("DELETE FROM image WHERE idImage = ?", idImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted image with id: ", idImage);
    result(null, res);
  });
};

Image.removeAll = result => {
  sql.query("DELETE FROM image", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} images`);
    result(null, res);
  });
};

module.exports = Image;