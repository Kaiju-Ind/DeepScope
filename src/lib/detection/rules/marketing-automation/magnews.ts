import type { TechnologyDefinition } from '../../types';

export const magnewsTechnologyDefinition = {
	id: "magnews",
	name: "Magnews",
	website: "https://www.magnews.it",
	description: "Magnews is an AI-driven marketing platform designed to support omnichannel customer journey management.",
	icon: "Magnews.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "magnews:dom:0",
			kind: "dom",
			selector: "form[action*='.magnews.net/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
