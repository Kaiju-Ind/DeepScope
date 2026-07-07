import type { TechnologyDefinition } from '../../types';

export const codeClimateTechnologyDefinition = {
	id: "code-climate",
	name: "Code Climate",
	website: "https://codeclimate.com",
	description: "Code Climate is a platform that enhances code quality and efficiency.",
	icon: "CodeClimate.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "code-climate:dom:0",
			kind: "dom",
			selector: "a[href*='codeclimate.com'] > img[src*='api.codeclimate.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
