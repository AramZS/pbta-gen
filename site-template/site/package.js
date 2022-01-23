
module.exports = (options) => {
	return {
		"name": "PBTA Game",
		"version": "1.0.0",
		"description": "PBTA Game",
		"main": "index.js",
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"build": "eleventy"
		},
		"keywords": [],
		"author": "",
		"license": "ISC",
		"devDependencies": {
			"@11ty/eleventy": "^0.12.1",
			"@11ty/eleventy-navigation": "^0.2.0",
			"@11ty/eleventy-plugin-rss": "^1.1.1",
			"@quasibit/eleventy-plugin-sitemap": "^2.1.4",
			"del": "^2.2.2",
			"markdown-it": "^10.0.0",
			"markdown-it-replace-link": "^1.1.0",
			"sass": "^1.34.1"
		},
		"dependencies": {
			"@11ty/eleventy-upgrade-help": "^1.0.1",
			"dotenv": "^10.0.0",
			"eleventy-plugin-dart-sass": "^1.0.3",
			"markdown-it-anchor": "^8.1.2",
			"markdown-it-find-and-replace": "^1.0.2",
			"markdown-it-regexp": "^0.4.0",
			"normalize-path": "^3.0.0",
			"nunjucks": "^3.2.3",
			"sanitize-filename": "^1.6.3",
			"slugify": "^1.6.0"
		}
  }
}
