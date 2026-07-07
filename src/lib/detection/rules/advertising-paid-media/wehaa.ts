import type { TechnologyDefinition } from '../../types';

export const wehaaTechnologyDefinition = {
	id: "wehaa",
	name: "Wehaa",
	website: "https://www.wehaa.com",
	description: "Wehaa is a platform providing revenue management and monetization solutions designed to help media companies optimize earnings and streamline their business operations.",
	icon: "Wehaa.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "wehaa:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.aws\\.wehaa\\.net\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
