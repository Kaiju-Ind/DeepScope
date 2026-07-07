import type { TechnologyDefinition } from '../../types';

export const rocketsparkTechnologyDefinition = {
	id: "rocketspark",
	name: "Rocketspark",
	website: "https://www.rocketspark.com",
	description: "Rocketspark is a website builder that enables users to design and manage professional-looking websites without coding, offering customizable templates and integrated ecommerce features.",
	icon: "Rocketspark.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rocketspark:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.rocketspark\\.com"),
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
