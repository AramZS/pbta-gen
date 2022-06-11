const { dirname, join } = require('path');
const { mkdirSync, existsSync, chownSync, fstat, copyFileSync, constants } = require('fs');

const createFile = (folder, pathName, filePath, overwrite = false) => {
	const fullPath = join(folder, pathName)
	const originPath = join('./', filePath)
	if (overwrite){
		copyFileSync(originPath, fullPath)
	} else {
		copyFileSync(originPath, fullPath, constants.COPYFILE_EXCL)
	}
}

module.exports = {
	createFile
}
