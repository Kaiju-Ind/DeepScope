import type { TechnologyDefinition } from '../../types';

export const blazeTechnologyDefinition = {
	id: "blaze",
	name: "BLAZE",
	website: "https://www.blaze.me",
	description: "BLAZE is a cannabis software POS system for dispensaries and delivery services, offering integrated payment processing and a range of industry-rated features.",
	icon: "BLAZE.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "blaze:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("gateway\\.blaze\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
