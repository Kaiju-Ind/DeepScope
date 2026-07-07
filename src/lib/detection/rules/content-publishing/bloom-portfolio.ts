import type { TechnologyDefinition } from '../../types';

export const bloomPortfolioTechnologyDefinition = {
	id: "bloom-portfolio",
	name: "Bloom Portfolio",
	website: "https://bloom.io/features/website-portfolio",
	description: "Bloom Portfolio is an online platform for showcasing work in a structured manner.",
	icon: "BloomIO.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "bloom-portfolio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.bloom\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bloom-portfolio:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("Bloom\\.io", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bloom-portfolio:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("bloom\\.io", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
