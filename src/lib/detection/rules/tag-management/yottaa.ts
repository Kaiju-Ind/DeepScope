import type { TechnologyDefinition } from '../../types';

export const yottaaTechnologyDefinition = {
	id: "yottaa",
	name: "Yottaa",
	website: "https://www.yottaa.com",
	description: "Yottaa is an ecommerce optimisation platform that helps with conversions, performance and security.",
	icon: "Yottaa.svg",
	categories: [
		"tag-management",
		"experimentation-optimization",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "yottaa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.yottaa\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
