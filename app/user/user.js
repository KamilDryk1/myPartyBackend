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
			activeEvents: [],
			token: null
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
	}

	async getUser() {
		const users = await getJsonData('data/users.json');

		const user = getObjectFromArray(users.users, 'email', this.data.email);

		if (!user) {
			return;
		}

		return user;
	}

	async updateUser(key, value) {
		const users = await getJsonData('data/users.json');
		const usersArray = users.users;

		const user = getObjectFromArray(usersArray, "email", this.data.email);

		user[key] = value;

		const newUsersArray = usersArray.map((obj) => {
			if (obj.email === this.data.email) {
				return obj = user;
			} else {
				return obj;
			}
		});

		users.users = newUsersArray;

		writeJsonData('data/users.json', users);
	}

	getLastId(users) {
		return users.reduce((maxObj, currentObj) => {
			return currentObj.id > maxObj ? currentObj.id : maxObj;
		}, users[0].id);
	}
}

exports.User = User;