import type { TechnologyDefinition } from '../../types';

export const pageupTechnologyDefinition = {
	id: "pageup",
	name: "PageUp",
	website: "https://www.pageuppeople.com",
	description: ".",
	icon: "PageUp.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "pageup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("careers-static\\.pageuppeople\\.com\\/"),
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
} as const satisfies TechnologyDefinition;
