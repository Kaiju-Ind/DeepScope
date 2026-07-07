import type { TechnologyDefinition } from '../../types';

export const adaloTechnologyDefinition = {
	id: "adalo",
	name: "Adalo",
	website: "https://www.adalo.com",
	description: "Adalo is a no-code platform enabling the creation of mobile and web applications.",
	icon: "Adalo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adalo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.adalo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adalo:dom:1",
			kind: "dom",
			selector: "link[href*='.adalo.com/static/'][rel='stylesheet']",
			description: "DOM selector matches a known technology marker.",
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
