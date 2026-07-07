import type { TechnologyDefinition } from '../../types';

export const customersureTechnologyDefinition = {
	id: "customersure",
	name: "CustomerSure",
	website: "https://www.customersure.com",
	description: "CustomerSure is a software platform designed to gather, manage, and respond to customer feedback, enhancing satisfaction and driving sales growth.",
	icon: "CustomerSure.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "customersure:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("resources\\.customersure\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
