import type { TechnologyDefinition } from '../../types';

export const osanoTechnologyDefinition = {
	id: "osano",
	name: "Osano",
	website: "https://www.osano.com",
	description: "Osano is a data privacy platform that helps your website become compliant with laws such as GDPR and CCPA.",
	icon: "Osano.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "osano:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cookieconsent\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "osano:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cmp\\.osano\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "osano:jsGlobal:2",
			kind: "jsGlobal",
			property: "Osano",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "osano:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("ajax\\/libs\\/cookieconsent2?\\/([\\d\\.]+)\\/cookieconsent.min.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "osano:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("npm\\/cookieconsent@(\\d)\\/build\\/cookieconsent.min.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "osano:jsGlobal:5",
			kind: "jsGlobal",
			property: "Osano.cm.cmpVersion",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
