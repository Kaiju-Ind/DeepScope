import type { TechnologyDefinition } from '../../types';

export const piioTechnologyDefinition = {
	id: "piio",
	name: "Piio",
	website: "https://piio.co",
	description: "Piio is a tool designed to optimise images for websites, enhancing loading speeds and user experience.",
	icon: "Piio.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "piio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.piiojs\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "piio:dom:1",
			kind: "dom",
			selector: "link[href*='.piiojs.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
