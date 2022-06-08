#!/usr/bin/env node
const pkg = require("./package.json");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fileSet = require("./src/get-files")
const { createFolders, createBaseFolder } = require("./src/create-structure")
// https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
require("please-upgrade-node")(pkg, {
  message: function (requiredVersion) {
    return (
      "PBTA-Gen requires Node " +
      requiredVersion +
      ". You will need to upgrade Node to use pbta-gen!"
    );
  },
});
const debug = require("debug")("pbta-gen:cmd");

const { readdirSync } = require('fs')

const getDirectories = source => {
	const hiddenFiles = new RegExp(/^\.|node_modules/g)
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
	.filter(dirent => !hiddenFiles.test(dirent.name))
    .map(dirent => dirent.name)
}

const getSite = async (source = "./") => {
	const files = await fileSet.getFiles(source)
	return files;
}

const getTopFiles = async (source = './') => {
	const hiddenFiles = new RegExp(/(^\.)|(node_modules)/i)
  	const folders = readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.filter((dir) => {
			var test =  hiddenFiles.test(dir.name)
			// console.log(dir.name, test)
			return !test
		})
		.filter((d)=>{
			// console.log('dirent', d.name)
			return true;
		})
		.map(dirent => dirent.name);
	// console.log('folders', folders)
	const folderSet = folders.map( async (folder) => {
		const files = await getSite(folder)
		return files
	})
	const allFolderSets = await Promise.all(folderSet)
	const files = [];
	[...allFolderSets].forEach((folderSet) => {
			files.push(...folderSet)
		}
	)
	return files
}

const argv = process.argv.filter((arg) => { return !!arg.match(/--/) });

debug("command: pbta-gen %o", argv);

getTopFiles('./').then((results) => {
	const relativeResults = results.map((file) => {
		return file.replace(__dirname, '')
	})
	// npx ./ --target=../testsite
	console.log('PBTA Generator Go', yargs(argv).argv, relativeResults)
	const siteTemplate = relativeResults.filter((file)=>{
		return /site-template/.test(file)
	})
	const projectFiles = siteTemplate.filter((file)=>{
		return /site-template\/project-files/.test(file)
	})
	const srcFiles = siteTemplate.filter((file)=>{
		return /site-template\/site/.test(file)
	})
	console.log('Site template', siteTemplate);
	if (yargs(argv).argv.hasOwnProperty('create')){
		const { create } = yargs(argv).argv;
		let folderPath = '';
		if (typeof create == 'string'){
			folderPath = create;
		} else {
			folderPath = './'
		}
		createBaseFolder(folderPath)
		const creationQueue = srcFiles.map((aPath) => {
			const createPath = aPath.replace(/site-template\/site/, 'src')
			createFolders(folderPath, createPath)
		})
	}
})
