import type { TechnologyDefinition } from '../../types';

export const splitHeroTechnologyDefinition = {
	id: "split-hero",
	name: "Split Hero",
	website: "https://splithero.com",
	description: "Split Hero is a WordPress tool for A/B split testing, enabling performance comparisons between different page variations to optimize user engagement and conversions.",
	icon: "SplitHero.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "split-hero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.splithero\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
