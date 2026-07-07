import type { TechnologyDefinition } from '../../types';

export const plicesTechnologyDefinition = {
	id: "plices",
	name: "Plices",
	website: "https://plices.com",
	description: "Plices is a platform for marketing and sales automation that supports the planning, execution, measurement, and optimization of strategies.",
	icon: "Plices.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "plices:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.plices\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
