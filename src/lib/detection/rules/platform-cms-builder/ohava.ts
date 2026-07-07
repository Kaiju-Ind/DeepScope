import type { TechnologyDefinition } from '../../types';

export const ohavaTechnologyDefinition = {
	id: "ohava",
	name: "Ohava",
	website: "https://ohava.com",
	description: "Ohava is a platform for managing business websites and marketing.",
	icon: "Ohava.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ohava:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.ohava\\.tools"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
