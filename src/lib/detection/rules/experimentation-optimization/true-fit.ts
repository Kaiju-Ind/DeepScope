import type { TechnologyDefinition } from '../../types';

export const trueFitTechnologyDefinition = {
	id: "true-fit",
	name: "True Fit",
	website: "https://www.truefit.com",
	description: "True Fit is a data-driven personalisation platform for footwear and apparel retailers.",
	icon: "True Fit.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "true-fit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.truefitcorp\\.com\\/(?:.+\\/([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
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
