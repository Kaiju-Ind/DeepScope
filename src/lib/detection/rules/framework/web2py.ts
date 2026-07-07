import type { TechnologyDefinition } from '../../types';

export const web2pyTechnologyDefinition = {
	id: "web2py",
	name: "Web2py",
	website: "https://web2py.com",
	icon: "Web2py.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "web2py:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web2py\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "web2py:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("web2py", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "web2py:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Web2py", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "web2py:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("web2py", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "web2py:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^web2py", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:web2py:web2py:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
		"python",
	],
} as const satisfies TechnologyDefinition;
