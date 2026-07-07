import type { TechnologyDefinition } from '../../types';

export const rankscienceTechnologyDefinition = {
	id: "rankscience",
	name: "RankScience",
	website: "https://www.rankscience.com",
	description: "RankScience is a split testing platform that uses data science to optimize search traffic.",
	icon: "RankScience.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "rankscience:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ranksci\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
