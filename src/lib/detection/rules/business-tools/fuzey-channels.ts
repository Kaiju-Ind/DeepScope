import type { TechnologyDefinition } from '../../types';

export const fuzeyChannelsTechnologyDefinition = {
	id: "fuzey-channels",
	name: "Fuzey Channels",
	website: "https://www.getfuzey.com/features/channels",
	description: "Fuzey Channels is an AI-powered communication platform designed specifically for the automotive industry to streamline customer interactions.",
	icon: "Fuzey.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "fuzey-channels:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.fuzey\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
