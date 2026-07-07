import type { TechnologyDefinition } from '../../types';

export const zenrezTechnologyDefinition = {
	id: "zenrez",
	name: "Zenrez",
	website: "https://zenrez.com",
	description: "Zenrez is a provider of sales and marketing software designed for boutique fitness studios, with a focus on revenue management.",
	icon: "Zenrez.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zenrez:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.zenrez\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
