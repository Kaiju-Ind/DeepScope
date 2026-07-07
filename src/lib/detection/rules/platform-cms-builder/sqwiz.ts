import type { TechnologyDefinition } from '../../types';

export const sqwizTechnologyDefinition = {
	id: "sqwiz",
	name: "Sqwiz",
	website: "https://sqwiz.com",
	description: "Sqwiz is a tool that uses previously entered business information, such as name, contact details, and Facebook posts, to build a mobile-ready website.",
	icon: "Sqwiz.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sqwiz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/sqwiz\\.com\\/Scripts\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sqwiz:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/sqwiz\\.com\\/scripts\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
