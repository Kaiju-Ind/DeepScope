import type { TechnologyDefinition } from '../../types';

export const braftonTechnologyDefinition = {
	id: "brafton",
	name: "Brafton",
	website: "https://www.brafton.com",
	description: "Brafton is a creative content marketing platform that provides services for content strategy, creation, and distribution to help organizations engage audiences and support digital marketing efforts.",
	icon: "Brafton.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brafton:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brafton\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
