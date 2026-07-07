import type { TechnologyDefinition } from '../../types';

export const hoolahTechnologyDefinition = {
	id: "hoolah",
	name: "hoolah",
	website: "https://www.hoolah.co",
	description: "hoolah is Asia's omni-channel buy now pay later platform.",
	icon: "hoolah.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "hoolah:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("merchant\\.cdn\\.hoolah\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hoolah:jsGlobal:1",
			kind: "jsGlobal",
			property: "hoolah",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
