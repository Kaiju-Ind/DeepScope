import type { TechnologyDefinition } from '../../types';

export const amplifyJsTechnologyDefinition = {
	id: "amplify-js",
	name: "Amplify JS",
	website: "https://amplifyjs.com/",
	description: "AmplifyJS is a set of components designed to solve common web application problems with a simplistic API. Amplify's goal is to simplify all forms of data handling by providing a unified API for various data sources.",
	icon: "Amplify JS.png",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "amplify-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?amplify(?:-production)?(?:\\.core)?(?:\\.store)?(?:\\.min)?(?:[-\\.][\\d\\w]{0,40})?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
