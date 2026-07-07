import type { TechnologyDefinition } from '../../types';

export const safebuyTechnologyDefinition = {
	id: "safebuy",
	name: "SafeBuy",
	website: "https://www.safebuy.org.uk",
	description: "SafeBuy is a platform that reviews consumer feedback, verifies site links, ensures data privacy, and checks legal compliance to generate a reliable Universal Rating for customers.",
	icon: "SafeBuy.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "safebuy:dom:0",
			kind: "dom",
			selector: "a[href*='www.safebuy.org.uk'] > img[src*='.safebuy.org.uk']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
