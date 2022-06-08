const { dirname, join } = require('path');
const { mkdirSync, existsSync, chownSync } = require('fs');
const { userInfo } = require('os');

const getUserId = () => {
	const userInfoObj = userInfo();
	return userInfoObj.uid
}

const getGroupId = () => {
	const userInfoObj = userInfo();
	return userInfoObj.gid
}

const createBaseFolder = (folder) => {
	console.log('Create folders on base', folder)
	chownSync(folder, getUserId(), getGroupId());
}

const createFolders = (folder, pathName) => {

	const fullPath = join(folder, pathName)
	const folderName = dirname(fullPath)
	if (!existsSync(folderName)){
		mkdirSync(folderName, { recursive: true })
	}

}

module.exports = {
	createFolders,
	createBaseFolder
}
