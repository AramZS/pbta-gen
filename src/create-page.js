const fs = require('fs');

const handlePageTitle = (title, fileName) => {
	const data = fs.readFileSync(fileName, 'utf8');
	const replacedData = data.replace(/{{title}}/gm, title)
	fs.writeFileSync(fileName, replacedData)
}
