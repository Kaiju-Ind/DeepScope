import type { TechnologyDefinition } from '../../types';

export const recaptureTechnologyDefinition = {
	id: "recapture",
	name: "Recapture",
	website: "https://recapture.io",
	description: "Recapture is an abandoned cart recovery and email marketing solution.",
	icon: "Recapture.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "recapture:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.recapture\\.io\\/.+\\?v=\\d+(?:&ver=([\\d\\.]+)?)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
