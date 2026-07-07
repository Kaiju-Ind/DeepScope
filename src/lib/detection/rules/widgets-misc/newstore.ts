import type { TechnologyDefinition } from '../../types';

export const newstoreTechnologyDefinition = {
	id: "newstore",
	name: "NewStore",
	website: "https://www.newstore.com",
	description: "NewStore is the only integrated platform offering omnichannel solutions for stores and consumers.",
	icon: "NewStore.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "newstore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.api\\.highstreetapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "newstore:jsGlobal:1",
			kind: "jsGlobal",
			property: "highstreetBanner.config",
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
