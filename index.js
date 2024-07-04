const express = require("express");
const bodyParser = require("body-parser");

const { User } = require("./app/user/user");

const { auth } = require("./app/auth/auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.post('/auth', async (req, res) => {
	const credentials = req.body;

	const token = await auth(credentials);

	if (token) {
		res.status(200).json({ token: token })
	} else {
		res.status(403).json({ message: "Invalid credentials or user doesn't exist!" })
	}
});

app.post('/user/create', async (req, res) => {
	const userData = req.body;

	const newUser = new User(userData);

	const error = await newUser.createUser();

	if (!error) {
		res.status(200).json({ message: "User has been created!" });
	} else if (error === 'User with this email already exist!') {
		res.status(403).json({ message: error });
	} else {
		res.status(403).json({ message: 'Error while creating user!' })
	};
})

app.listen(8080);