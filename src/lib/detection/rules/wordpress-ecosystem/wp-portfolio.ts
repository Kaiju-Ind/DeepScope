import type { TechnologyDefinition } from '../../types';

export const wpPortfolioTechnologyDefinition = {
	id: "wp-portfolio",
	name: "WP Portfolio",
	website: "https://wpportfolio.net",
	description: "WP Portfolio is a premium standalone WordPress plugin designed for creating and showcasing portfolios.",
	icon: "WP Portfolio.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-portfolio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/astra-portfolio\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
