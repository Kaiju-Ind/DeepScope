import type { TechnologyDefinition } from '../../types';

export const formbucketTechnologyDefinition = {
	id: "formbucket",
	name: "FormBucket",
	website: "https://formbucket.com",
	description: "FormBucket is a platform for building custom forms and capturing submitted data for structured collection and analysis.",
	icon: "FormBucket.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formbucket:dom:0",
			kind: "dom",
			selector: "form[action*='api.formbucket.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
