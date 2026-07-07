import type { TechnologyDefinition } from '../../types';

export const bringieTechnologyDefinition = {
	id: "bringie",
	name: "Bringie",
	website: "https://www.bringie.com",
	description: "Bringie is a conversion optimization platform that analyzes user behavior and performance metrics to enhance website effectiveness and increase engagement outcomes.",
	icon: "Bringie.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bringie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.bringie\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
