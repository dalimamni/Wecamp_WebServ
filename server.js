const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
const bcrypt = require('bcrypt');
const multer = require('multer');
const crypt = require('bcrypt-nodejs');
const con = require("./app/models/db.js");
const { query } = require("express");
var fs = require('fs');
const app = express();
app.use("/complaints", express.static(__dirname + '/complaints'));
const saltRounds = 10;
// parse requests of content-type: application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to wecamp application." });
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wecamp.app.contact@gmail.com',
    pass: 'weCamp123'
  }
});

function sendVerificationEmail(email, idMembre)
{
	let randomCode = randomize('0', 5);
	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Account Verification',
		html: "<p>You can use this code to verify your account: " + randomCode + ".</p>"
	};
	transporter.sendMail(mailOptions, function(error, info){
	if (error) 
	{
		console.log(error);
	} 
	else 
	{
		console.log('Email sent: ' + info.response);
		con.query("INSERT INTO verificationcodes (idMembre, verifCode) VALUES(?, ?)", [idMembre, randomCode]);
	}
	});
}


function sendApprouvedAccountEmail(email)
{
	
	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Compte Vérifié',
		html: "<p>Votre compte WeCamp a été vérifié: .</p>"
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

function sendForgotPasswordEmail(email, idMembre)
{
	let randomCode = randomize('0', 5);
	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Reset your password',
		html: "<p>You can use this code to reset your password: " + randomCode + ".</p>"
	};
	transporter.sendMail(mailOptions, function(error, info){
	if (error) 
	{
		console.log(error);
	} 
	else 
	{
		console.log('Email sent: ' + info.response);
		con.query("INSERT INTO verificationcodes (idMembre, verifCode) VALUES(?, ?)", [idMembre, randomCode]);
	}
	});
}

function sendVerificationAccountEmail(email, idMembre)
{
	let randomCode = randomize('0', 5);
	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Vérifier Votre Compte WeCamp',
		html: "<p>You can use this code to verify your account: " + randomCode + ".</p>"
	};
	transporter.sendMail(mailOptions, function(error, info){
	if (error) 
	{
		console.log(error);
	} 
	else 
	{
		console.log('Email sent: ' + info.response);
		con.query("INSERT INTO verificationcodes (idMembre, verifCode) VALUES(?, ?)", [idMembre, randomCode]);
	}
	});
}

function sendPasswordChangedEmail(email, idMembre)
{
	
	var mailOptions = {
		from: 'wecamp.app.contact@gmail.com',
		to: email,
		subject: 'Password Changed',
		html: "<p>Your password has been changed successfully: .</p>"
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

function verifyUser(idMembre, code, cb)
{
	con.query("SELECT * FROM verificationcodes WHERE idMembre = ? AND verifCode = ?", [idMembre, code],
		function(err, result)
		{
			if (err) throw err;
			cb(result);
		}
	);
}

function verifResetCode(idMembre, code, cb)
{
	con.query("SELECT * FROM verificationcodes WHERE idMembre = ? AND verifCode = ?", [idMembre, code],
		function(err, result)
		{
			if (err) throw err;
			cb(result);
		}
	);
	return true;
}

// when member click on fogot my password
app.post("/forgot_password", function(req, res)
{
    let email = req.body.email;
    con.query("SELECT * FROM membre WHERE email = ? ", [email],
    function (err, result)
    {  
        if (err) throw err;
        let numRows = result.length;
        if (numRows = 0)
        {
            res.json({response : "Invalid Email"});
        }
        else
        {	
			sendForgotPasswordEmail(email, result[0].idMembre);
			console.log("check your email");
			res.json({response : result[0].idMembre});
        }
    });
});


app.post("/verify_account", function(req, res)
{
    let email = req.query.email;
    con.query("SELECT * FROM membre WHERE email = ? ", [email],
    function (err, result)
    {  
        if (err) throw err;
        let numRows = result.length;
        if (numRows = 0)
        {
            res.json("Invalid Email");
        }
        else
        {	
			sendVerificationAccountEmail(email, result[0].idMembre);
			console.log("check your email");
			res.json(result[0].idMembre);
        }
    });
});

// used to verif the code sent
app.post("/verify_reset_code", function(req, res)
{
	let email = req.body.email;
	let code = req.body.code;
	con.query("SELECT * FROM membre WHERE email = ? ", [email],
    function (err, result)
    {  
        if (err) throw err;
        let numRows = result.length;
        if (numRows = 0)
        {
            res.json("Invalid Email");
        }
        else
			{
				var user = result[0].idMembre;
				verifResetCode(user, code, function(result)
				{
					let length = result.length;
					if (length == 0)
					{
						res.json({response : false});
					}
					else
					{
						res.json({response : true});
					}
				});
			}
        
    });
	
});

// when the code sent is valid
app.post("/reset_password", function(req, res)
{	let verifCode = req.body.code;
	let email = req.body.email;
	let password = req.body.password;
	con.query("SELECT * FROM membre WHERE email = ? ", [email],
    function (err, resultSelect)
    {  
        if (err) throw err;
        let numRows = resultSelect.length;
        if (numRows = 0)
        {
            res.json("Invalid Email");
        }
        else
        {	
			var idMembre = resultSelect[0].idMembre;
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(password, saltRounds, function(hashErr, hash) {
					con.query("UPDATE membre SET password = ? WHERE idMembre = ? ", [hash, idMembre],
				    function (err, result)
				    {  
				        if (err) throw err;
				        let numRows = result.length;
				        if (numRows = 0)
				        {
				            res.json("Invalid Email");
				        }
				        else
				        {
							sendPasswordChangedEmail(email, idMembre);
							con.query("DELETE FROM verificationcodes WHERE idMembre = ? ", [idMembre]);
							console.log("check your email");
							res.json({response : [idMembre]});
				        }
		    });
				});
			});
			
        }
    });
	
});

app.post("/register_user", function(req, res)
{
    console.log("registering")
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let email = req.body.email;
    let dateNaiss = req.body.dateNaiss;
    let pass = req.body.password;
    con.query("SELECT * FROM membre WHERE email = ? ", [email],
    function (err, result)
    {  
        if (err) throw err;
        let numRows = result.length;
        if (numRows != 0)
        {
            res.json({response : "Email is already associated with an account"});
        }
        else
        {
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(pass, saltRounds, function(hashErr, hash) {
					con.query("INSERT INTO membre (nom, prenom, email, dateNaissance, password) VALUES(?,?,?,?,?)",
					 [nom, prenom, email, dateNaiss, hash],
					function(err2, result2)
					{
						if (err2) throw err2;
						let resultId = result2.insertId;
						sendVerificationEmail(email, resultId);
						res.json({response : resultId});
						console.log({response : resultId});
					});
				});
			});
			
        }
    });
});

app.get('/user', function(req, res)
{
    let email = req.query.email;
    con.query("SELECT * FROM membre WHERE email = ? LIMIT 1", [email],
    function (err, result)
    {  
        if (err) throw err;
        if(result.length != 0)
        {
            res.json({response : result[0]});
        }
        else
        {
            res.json({response : "No user found"});
        }
    })
});
 
app.get('/login', function(req, res)
{
    let email = req.query.email;
    let pass = req.query.pass;
    console.log("Trying to find " + email + " with password: " + pass);
    con.query("SELECT * FROM membre WHERE email = ? LIMIT 1", [email],
	    function (err, result)
	    {  
	        if (err) throw err;
	        let numRows = result.length;
	        if (numRows == 0)
	        {
	            res.json({response : "Account not found"});
	        }
			else
			{
				bcrypt.compare(pass, result[0]["password"], function(err, cmpHash) 
				{
					if (cmpHash)
					{
						res.json({response : result[0]});
					}
					else
					{
						res.json({response : "Wrong password"});
					}
				});
			}
	    })
});
 
app.get("/confirm_unicity", function(req, res)
{
    let email = req.query.email;
    let phone = req.query.phone;
    con.query("SELECT * FROM membre WHERE email = ? OR numTel = ?", [email, phone],
    function (err, result)
    {  
        if (err) throw err;
        let numRows = result.length;
        if (numRows != 0)
        {
            res.json({response : true});
        }
        else
        {
            res.json({response : false});
        }
    });
});


app.post("/verify_user", function(req, res)
{
	let email = req.body.email;
	let user = req.body.idMembre;
	let code = req.body.code;
	verifyUser(user, code, function(result)
	{
		let length = result.length;
		if (length == 0)
		{
			res.json("This code is invalid");
		}
		else
		{
			con.query("DELETE FROM verificationcodes WHERE idMembre = ?", [user]);
			con.query("UPDATE membre SET verified = 1 WHERE idMembre = ?", [user]);
			sendApprouvedAccountEmail(email)
			res.json({response : "User updated"});
		}
	});
});
 
const Lieucontroller = require("./app/controllers/groupe.controller");
const {
	create,
	findAll,
	findOne,
	update,
	updateById,
	deleteAll
} = require("./app/controllers/groupe.controller");
var resultId;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './complaints');
    var fileName;

  },
  filename: function (req, file, cb) {
    fileName=file.originalname;
    cb(null, file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false)
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});





app.post("/add_image", upload.single('image'), (req, res, next) => {
	console.log(req.file);
	

    let idMembre = req.body.idMembre;
	let nom = req.body.nom;
	let slogan = req.body.slogan;
	let image = req.file.path;
	
	
	
	
    //var baseName = fileName.replace(/\.[^.]+$/, '');
    
   // var idd= parseInt(baseName,10);
   // console.log(baseName + "this is the number ");


	con.query("INSERT INTO groupe (idMembre, nom, slogan, image)  VALUES(?, ?, ?, ?)", [idMembre, nom, slogan, image],

      function (err, result)    {
		if (err) throw err;
        let last_id = result.insertId;
        fs.rename('complaints/file_avatar.jpg', 'complaints/'+last_id+'.jpg', function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
        con.query("SELECT * FROM groupe WHERE idGroupe = ? LIMIT 1", [last_id],
        function(err2, result2)
        {
            res.json(result2)
        });
    });
  }
  
  //
  //createAnimal
);
app.get('/get_image', function(req, res)
{
    console.log("GETTING COMPLAINTS");
    //con.query("SELECT s.*, u.*, s.id AS comp_id FROM complaint s INNER JOIN user u ON s.user_id = u.id",
    con.query("SELECT * FROM lieux",
    function (err, result)
    {  
        if (err) throw err;
        res.json(result);
    })
});




require("./app/routes/lieu.routes.js")(app);
require("./app/routes/groupe.routes.js")(app);
require("./app/routes/circuit.routes.js")(app);
require("./app/routes/image.routes.js")(app);
require("./app/routes/circuitPoint.routes.js")(app);
require("./app/routes/membreCircuit.routes.js")(app);
require("./app/routes/membreGroupe.routes.js")(app);
require("./app/routes/membre.routes.js")(app);
require("./app/routes/profil.routes.js")(app);
require("./app/routes/review.routes.js")(app);
require("./app/routes/rating.routes.js")(app);
require("./app/routes/conseil.routes.js")(app);
// set port, listen for requests
app.listen(3305, () => {
  console.log("Server is running on port 3305.");

});
