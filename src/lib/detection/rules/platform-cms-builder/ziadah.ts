import type { TechnologyDefinition } from '../../types';

export const ziadahTechnologyDefinition = {
	id: "ziadah",
	name: "Ziadah",
	website: "https://www.ziadah.app",
	description: "Ziadah is a specialist in enhancing ecommerce sales by increasing Average Order Value (AOV) through strategic inbound marketing, focusing on cross-selling and upselling techniques.",
	icon: "Ziadah.svg",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
	],
	rules: [
		{
			id: "ziadah:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ziadah\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
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
