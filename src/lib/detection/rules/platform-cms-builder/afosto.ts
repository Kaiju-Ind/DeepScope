import type { TechnologyDefinition } from '../../types';

export const afostoTechnologyDefinition = {
	id: "afosto",
	name: "Afosto",
	website: "https://afosto.com",
	icon: "Afosto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "afosto:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Afosto SaaS BV", "i"),
			version: {
				source: "match",
				template: "2.0",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "afosto:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.afosto\\.nl\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "afosto:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("afosto saas bv", "i"),
			version: {
				source: "match",
				template: "2.0",
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
