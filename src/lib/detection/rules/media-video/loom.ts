import type { TechnologyDefinition } from '../../types';

export const loomTechnologyDefinition = {
	id: "loom",
	name: "Loom",
	website: "https://www.loom.com",
	icon: "Loom.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "loom:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("loom\\.com\\/api"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "loom:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("luna\\.loom\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "loom:dns:2",
			kind: "dns",
			valuePattern: new RegExp("loom-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
