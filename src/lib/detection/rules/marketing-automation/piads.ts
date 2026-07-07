import type { TechnologyDefinition } from '../../types';

export const piadsTechnologyDefinition = {
	id: "piads",
	name: "PiAds",
	website: "https://piads.vn",
	description: "PiAds is a marketing system designed to enhance the efficiency of advertising campaigns through targeted strategies and data-driven insights.",
	icon: "PiAds.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "piads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.piads\\.vn\\/"),
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
