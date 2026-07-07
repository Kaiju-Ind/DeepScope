import type { TechnologyDefinition } from '../../types';

export const youzanTechnologyDefinition = {
	id: "youzan",
	name: "Youzan",
	website: "https://www.youzan.com",
	description: "Youzan is a Chinese shopping platform that provides businesses with tools for ecommerce, online store management, and customer engagement.",
	icon: "Youzan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "youzan:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("m\\.youzan\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
