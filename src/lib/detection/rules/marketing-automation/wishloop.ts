import type { TechnologyDefinition } from '../../types';

export const wishloopTechnologyDefinition = {
	id: "wishloop",
	name: "Wishloop",
	website: "https://wishloop.com",
	description: "Wishloop is a lead generation platform that enables the creation of marketing campaigns without coding, using structured workflows and tools designed to support conversion-focused data collection.",
	icon: "Wishloop.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wishloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.wishloop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
