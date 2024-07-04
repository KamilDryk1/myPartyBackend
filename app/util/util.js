const fs = require('node:fs/promises');

async function getJsonData(file) {
	const fileRawContent = await fs.readFile(file, { encoding: 'utf-8' });
	const data = JSON.parse(fileRawContent);

	return data;
};

async function writeJsonData(file, data) {
	return fs.writeFile(file, JSON.stringify(data));
};

function isArrayContainsValue(array, key, value) {
	return array.some(obj => obj[key] === value);
}

function getObjectFromArray(array, key, value) {
	return array.find(obj => obj[key] === value);
}

exports.getJsonData = getJsonData;
exports.writeJsonData = writeJsonData;
exports.isArrayContainsValue = isArrayContainsValue;
exports.getObjectFromArray = getObjectFromArray;