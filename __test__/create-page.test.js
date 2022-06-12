const fs = require('fs')
const path = require('path')
const createPage = require('../src/create-page')

describe("The Page Creation system", function () {
	const testMarkdown = path.join(__dirname, './testFiles/testMarkdown.md')
	const dummyMarkdown = `---
	title: "{{title}}"
	description: "{{description}}"
	date: {{date}}
	tags:
	  - 11ty
	  - Node
	  - WiP
	  - CLI
	  - TTRPG
	  - Yargs
	featuredImage: "close-up-keys.jpg"
	---

	## {{subtitle}}

	This is a test file.

	We're learning things about how well this works.
	`;
	beforeEach(()=>{
		createPage.writePageData(testMarkdown, dummyMarkdown)
	})
	afterAll(()=>{
		createPage.writePageData(testMarkdown, dummyMarkdown)
	})
	it("should swap multiple template strings", async function () {
		const testString = `#{{title}}
		blahtitle # {{title}}
		blah title

		{{title}}`;
		let data = createPage.handlePageReplacement('title', 'Foobar', testString)
		expect(data).toBe(`#Foobar
		blahtitle # Foobar
		blah title

		Foobar`)
	});
	it("should open a markdown file and get the contents as a string", function(){
		expect(createPage.getPageData(testMarkdown)).toBe(dummyMarkdown)
	})
	it("should write a markdown file with the file as a string", function(){
		expect(createPage.writePageData(testMarkdown, '# Foobar')).toBe(testMarkdown)
		expect(createPage.getPageData(testMarkdown)).toBe('# Foobar')
	})
})
