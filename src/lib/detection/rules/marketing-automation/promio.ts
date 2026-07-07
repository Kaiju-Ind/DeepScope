import type { TechnologyDefinition } from '../../types';

export const promioTechnologyDefinition = {
	id: "promio",
	name: "Promio",
	website: "https://www.promio.com",
	description: "Promio is a platform that provides marketing solutions for businesses and franchises, enhancing visibility and customer engagement.",
	icon: "Promio.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "promio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.promio\\.com\\/"),
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
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
