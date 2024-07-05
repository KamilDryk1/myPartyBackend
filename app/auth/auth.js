const md5 = require('md5');

const { getJsonData } = require('../util/util');

const { User } = require("../user/user");


class Auth {

	constructor(credentials) {
		this.email = credentials.email;
		this.password = credentials.password;
		this.token = null;
	}

	async authUser() {
		const newUser = new User({email: this.email, password: this.password});
		const user = await newUser.getUser();

		if (!user) {
			return false;
		}

		if (user.email === this.email && user.password === this.password) {
			this.generateToken(user);

			// Adding token to user's data
			await newUser.updateUser('token', this.token);

			return this.token;
		}
	}

	generateToken(user) {
		const timestamp = Date.now();
		const token = md5(user.email + user.id + user.birthYear + timestamp);

		this.token = token;
	}
}

exports.Auth = Auth;