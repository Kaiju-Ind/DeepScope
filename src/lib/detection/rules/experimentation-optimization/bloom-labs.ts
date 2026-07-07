import type { TechnologyDefinition } from '../../types';

export const bloomLabsTechnologyDefinition = {
	id: "bloom-labs",
	name: "Bloom Labs",
	website: "https://bloom.li",
	description: "Bloom Labs is a local content targeting system that uses data analytics to distribute content based on geographic relevance.",
	icon: "Bloom.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bloom-labs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.bloom\\.li\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
