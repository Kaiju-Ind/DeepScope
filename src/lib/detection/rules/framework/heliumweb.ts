import type { TechnologyDefinition } from '../../types';

export const heliumwebTechnologyDefinition = {
	id: "heliumweb",
	name: "HeliumWeb",
	website: "https://heliumweb.adrikikicp-development.ml",
	description: "HeliumWeb is a server-side (backend) web framework written in PHP & JavaScript",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "heliumweb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("helium\\/src\\/helium.js\\/helium_web.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heliumweb:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("http:\\/\\/maven.enriquitomcfh.ml\\/helium.js\\/helium_web.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heliumweb:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("http:\\/\\/maven.enriquitomcfh.ml\\/helium.js\\/helium_web.min.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heliumweb:jsGlobal:3",
			kind: "jsGlobal",
			property: "helium.js",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heliumweb:header:4",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Adrikikicp Development", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "heliumweb:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("adrikikicp development", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
