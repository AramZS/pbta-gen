#!/usr/bin/env node
const pkg = require("./package.json");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fileSet = require("./src/get-files")
const { createFolders, createBaseFolder } = require("./src/create-structure")
const { createFile } = require("./src/create-files")
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

const buildFile = function(aPath, replaceRegex, replacementString, folderPath, overwrite ){
	const createPath = aPath.replace(replaceRegex, replacementString)
	createFolders(folderPath, createPath)
	createFile(folderPath, createPath, aPath, overwrite)
	return createPath
}

const createSite = () => {
	getTopFiles('./').then((results) => {
		const relativeResults = results.map((file) => {
			return file.replace(__dirname, '')
		})
		// npx ./ --target=../testsite
		console.log('PBTA Generator Go', yargs(argv).argv)//, relativeResults)
		const siteTemplate = relativeResults.filter((file)=>{
			return /site-template/.test(file)
		})
		const projectFiles = siteTemplate.filter((file)=>{
			return /site-template\/project-files/.test(file)
		})
		const srcFiles = siteTemplate.filter((file)=>{
			return /site-template\/site/.test(file)
		})
		const githubFiles = siteTemplate.filter((file)=>{
			return /site-template\/github-files/.test(file)
		})
		const customPluginFiles = siteTemplate.filter((file)=>{
			return /site-template\/_custom-plugins/.test(file)
		})
		let overwrite = false
		let starters = false
		if (yargs(argv).argv.hasOwnProperty('overwrite')){
			overwrite = yargs(argv).argv.overwrite == "true" ? true : false
		}
		if (yargs(argv).argv.hasOwnProperty('starters')){
			starters = yargs(argv).argv.overwrite == "true" ? true : false
		}
		// console.log('Site template', siteTemplate);
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
				return buildFile(aPath, /site-template\/site/, 'src', folderPath, overwrite, starters)
				// const createPath = aPath.replace(/site-template\/site/, 'src')
				// createFolders(folderPath, createPath)
				// return createPath
			})
			const creationQueueMainBuildFiles = projectFiles.map((aPath) => {
				return buildFile(aPath, /site-template\/project-files/, '', folderPath, overwrite, starters)
				//const createPath = aPath.replace(/site-template\/project-files/, '')
				//createFolders(folderPath, createPath)
				//return createPath
			})
			const creationGithubFiles = githubFiles.map((aPath) => {
				return buildFile(aPath, /site-template\/github-files/, '.github', folderPath, overwrite, starters)
				// const createPath = aPath.replace(/site-template\/github-files/, '.github')
				// createFolders(folderPath, createPath)
				// return createPath
			})
			const creationCustomPlugins = customPluginFiles.map((aPath) => {
				return buildFile(aPath, /site-template\/_custom-plugins/, '_custom-plugins', folderPath, overwrite, starters)
				// const createPath = aPath.replace(/site-template\/github-files/, '_custom-plugins')
				// createFolders(folderPath, createPath)
				// return createPath
			})
		}
	})
}

if (yargs(argv).argv.hasOwnProperty('create')){
	createSite()
}

if (yargs(argv).argv.hasOwnProperty('newFile')){
	const { newFile } = yargs(argv).argv
	let title = false
	if (yargs(argv).argv.hasOwnProperty('title')){
		title = yargs(argv).argv.title
	}
	if ( newFile ){
		let templatePath = '';
		switch (newFile) {
			case 'agenda':

				break;
			case 'genre':

				break;
			case 'playbook':

				break;
			case 'threat':

				break;
			case 'player-move':

				break;
			case 'gm-move':

				break;
			case 'threat-move':

				break;
			default:
				break;
		}
	} else {
		throw new Error('The newFile property needs a value')
	}
}
