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
			return true;
		}
	}

	generateToken(user) {
		
	}
}

exports.Auth = Auth;