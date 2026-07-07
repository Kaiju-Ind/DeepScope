import type { TechnologyDefinition } from '../../types';

export const sircloTechnologyDefinition = {
	id: "sirclo",
	name: "Sirclo",
	website: "https://sirclo.com/",
	description: "Sirclo offers online business solutions.",
	icon: "Sirclo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sirclo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("template\\.sirclocdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sirclo:url:1",
			kind: "url",
			pattern: new RegExp("^https?\\/\\/.+\\.sirclo\\.me"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "sirclo:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Sirclo", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sirclo:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("sirclo", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
