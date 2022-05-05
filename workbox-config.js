module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{woff2,ttf,eot,woff,svg,css,js,jpg,ico,png,html,json,txt}'
	],
	swDest: 'build/service-worker',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};