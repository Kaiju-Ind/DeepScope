import type { TechnologyDefinition } from '../../types';

export const generatepressGpPremiumTechnologyDefinition = {
	id: "generatepress-gp-premium",
	name: "GeneratePress GP Premium",
	website: "https://docs.generatepress.com/article/installing-gp-premium/",
	description: "GP Premium is a premium add-on plugin for the GeneratePress WordPress theme.",
	icon: "generatepress.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "generatepress-gp-premium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/gp-premium\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
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
			"onetime",
			"recurring",
		],
	},
	implies: [
		"generatepress",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
