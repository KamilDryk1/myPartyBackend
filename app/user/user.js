const { getJsonData, writeJsonData, isArrayContainsValue, getObjectFromArray } = require('../util/util');

class User {

	constructor(data = null) {
		this.data = data;
	}

	async createUser() {
		const newUser = {
			firstName: this.data.firstName,
			lastName: this.data.lastName,
			email: this.data.email,
			password: this.data.password,
			birthYear: this.data.birthYear,
			rates: [],
			activeEvents: []
		};

		try {
			const users = await getJsonData('data/users.json');

			if (isArrayContainsValue(users.users, 'email', newUser.email)) {
				throw new Error('User with this email already exist!');
			};
			
			const highestId = this.getLastId(users.users);
	
			newUser.id = highestId++;
	
			users.users.push(newUser);
	
			writeJsonData('data/users.json', users);

			return false;
		} catch (e) {
			console.log(e);

			return e.message;
		}
	};

	async getUser(email) {
		const users = await getJsonData('data/users.json');

		const user = getObjectFromArray(users.users, 'email', email);

		if (!user) {
			return;
		}

		return user;
	};

	getLastId(users) {
		return users.reduce((maxObj, currentObj) => {
			return currentObj.id > maxObj ? currentObj.id : maxObj;
		}, users[0].id);
	}
};

exports.User = User;