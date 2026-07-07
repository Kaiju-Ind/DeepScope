import type { TechnologyDefinition } from '../../types';

export const wallkitTechnologyDefinition = {
	id: "wallkit",
	name: "Wallkit",
	website: "https://wallkit.net",
	description: "Wallkit is a plug-and-play subscription management system.",
	icon: "Wallkit.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "wallkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wallkit\\.net\\/js\\/integration\\/latest\\/wallkit-integration-library\\.min\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wallkit:jsGlobal:1",
			kind: "jsGlobal",
			property: "WALLKIT_CDN_URL",
			valuePattern: new RegExp("\\.wallkit\\.net"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
