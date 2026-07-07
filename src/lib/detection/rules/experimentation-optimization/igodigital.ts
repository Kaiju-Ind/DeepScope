import type { TechnologyDefinition } from '../../types';

export const igodigitalTechnologyDefinition = {
	id: "igodigital",
	name: "iGoDigital",
	website: "https://www.igodigital.com",
	description: "iGoDigital provides web-based commerce tools, personalisation, and product recommendations designed to increase customer interaction.",
	icon: "default.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "igodigital:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.igodigital\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
