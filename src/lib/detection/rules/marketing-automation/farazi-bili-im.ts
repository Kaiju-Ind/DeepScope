import type { TechnologyDefinition } from '../../types';

export const faraziBiliImTechnologyDefinition = {
	id: "farazi-bili-im",
	name: "Farazi Bilişim",
	website: "https://farazibilisim.com.tr",
	description: "Farazi Bilişim is a platform that enhances online visibility through search engine optimization strategies aimed at improving website ranking and performance across major search platforms.",
	icon: "Farazi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "farazi-bili-im:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("farazibilisim\\.com\\.tr"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "farazi-bili-im:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("farazibilisim\\.com\\.tr", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "farazi-bili-im:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("farazibilisim\\.com\\.tr", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
