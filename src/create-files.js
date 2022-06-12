const { dirname, join } = require('path');
const { mkdirSync, existsSync, chownSync, fstat, copyFileSync, constants, writeFileSync, write } = require('fs');

const createFile = (folder, pathName, filePath, overwrite = false, starters = false) => {
	if (!starters && path.extname(filePath) == ".md"){
		return
	}
	const fullPath = join(folder, pathName)
	const originPath = join('./', filePath)
	if (!starters && filePath.includes('motivations.json')){
		let motivationsString = JSON.stringify({
			"threat":{},
			"minor-threat": {},
			"location": {},
			"phenomenon": {},
			"npc": {}
		})
		if (existsSync(originPath) && !overwrite){
			return
		}
		writeFileSync(fullPath, motivationsString)
	}
	if (overwrite){
		copyFileSync(originPath, fullPath)
	} else {
		copyFileSync(originPath, fullPath, constants.COPYFILE_EXCL)
	}
}

module.exports = {
	createFile
}
