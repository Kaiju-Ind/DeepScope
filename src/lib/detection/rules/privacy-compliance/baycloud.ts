import type { TechnologyDefinition } from '../../types';

export const baycloudTechnologyDefinition = {
	id: "baycloud",
	name: "Baycloud",
	website: "https://baycloud.com",
	description: "Baycloud is an ePrivacy compliance tool that manages user consent, data handling, and regulatory requirements for websites and digital services.",
	icon: "Baycloud.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "baycloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.baycloud\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "baycloud:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.baycloud.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
