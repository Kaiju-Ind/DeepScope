import type { TechnologyDefinition } from '../../types';

export const onecommerceTechnologyDefinition = {
	id: "onecommerce",
	name: "OneCommerce",
	website: "https://onecommerce.io",
	description: "OneCommerce is an ecommerce solution platform that improves conversion rates, supports marketing automation, and utilizes social proof.",
	icon: "OneCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "onecommerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("onecommerce\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
