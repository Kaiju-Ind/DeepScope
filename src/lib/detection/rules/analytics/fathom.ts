import type { TechnologyDefinition } from '../../types';

export const fathomTechnologyDefinition = {
	id: "fathom",
	name: "Fathom",
	website: "https://usefathom.com",
	description: "Fathom is easy-yet-powerful website analytics that protects digital privacy.",
	icon: "Fathom.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "fathom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.usefathom\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fathom:jsGlobal:1",
			kind: "jsGlobal",
			property: "fathom.blockTrackingForMe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fathom:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("alert\\s*\\(\\s*[\"']Fathom has been enabled for this website\\.[\"']\\s*\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fathom:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("window\\.dispatchEvent\\s*\\(\\s*new\\s+Event\\s*\\(\\s*[\"']locationchangefathom[\"']\\s*\\)\\s*\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "fathom:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.usefathom\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
