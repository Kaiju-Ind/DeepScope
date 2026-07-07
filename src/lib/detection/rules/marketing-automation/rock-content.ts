import type { TechnologyDefinition } from '../../types';

export const rockContentTechnologyDefinition = {
	id: "rock-content",
	name: "Rock Content",
	website: "https://rockcontent.com",
	description: "Rock Content is a content marketing platform. It provides tools and resources for creating, distributing, and measuring content to help businesses engage their audience and achieve marketing goals.",
	icon: "RockContent.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rock-content:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rockcontent\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
