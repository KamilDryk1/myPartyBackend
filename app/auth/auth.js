const fs = require('node:fs/promises');

const { getJsonData } = require('../util/util')

class Auth {

	constructor(credentials) {
		this.email = credentials.email;
		this.password = credentials.password;
		this.token = null;
	}

	async authUser() {

	}
}

exports.Auth = Auth;