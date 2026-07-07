import type { TechnologyDefinition } from '../../types';

export const rateabizTechnologyDefinition = {
	id: "rateabiz",
	name: "RateAbiz",
	website: "https://rateabiz.com",
	description: "RateABiz is a reviews widgets for local service providers.",
	icon: "RateAbiz.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "rateabiz:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.rateabiz\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
