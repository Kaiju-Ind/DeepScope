import type { TechnologyDefinition } from '../../types';

export const daknoTechnologyDefinition = {
	id: "dakno",
	name: "Dakno",
	website: "https://www.dakno.com",
	description: "Dakno is an all-in-one lead generation and conversion system designed for the real estate industry.",
	icon: "Dakno.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "dakno:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.dakno.com/'], div[class*='dakno'] a[href*='www.dakno.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
