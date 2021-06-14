var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/db");
const db = require("./models");

var app = express();

var corsOptions = {
	origin: "*"
};

app.use(cors(corsOptions));

// use JWT auth to secure the api

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

db.mongoose
	.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
	})
	.catch((err) => {
		console.error("Connection error", err);
		process.exit();
	});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to plaurent NodeJS Mysql server." });
});

// routes
require("./routes/auth-routes")(app);
require("./routes/user-routes")(app);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.listen(server_port, server_ip_address, () => {
	console.log("Listening on " + server_ip_address + ", port " + server_port);
});
