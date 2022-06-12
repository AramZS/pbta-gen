const fs = require('fs');

const handlePageTitle = (title, fileName) => {
	const data = fs.readFileSync(fileName, 'utf8');
	const replacedData = data.replace(/{{title}}/gm, title)
	fs.writeFileSync(fileName, replacedData)
}

const getPageData = (fileName) => {
	const data = fs.readFileSync(fileName, 'utf8');
	return data;
}

const writePageData = (fileName, data) => {
	fs.writeFileSync(fileName, data)
	return fileName;
}

const handlePageReplacement = (field, value, data) => {
	var r = new RegExp('{{'+field+'}}', 'gm');
	const replacedData = data.replace(r, value)
	return replacedData
}


module.exports = {
	getPageData,
	writePageData,
	handlePageReplacement
}
