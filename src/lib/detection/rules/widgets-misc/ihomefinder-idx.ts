import type { TechnologyDefinition } from '../../types';

export const ihomefinderIdxTechnologyDefinition = {
	id: "ihomefinder-idx",
	name: "iHomefinder IDX",
	website: "https://www.ihomefinder.com",
	description: "iHomefinder provides IDX property search, built-in CRM, and marketing tools.",
	icon: "iHomefinder IDX.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ihomefinder-idx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.idxhome\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ihomefinder-idx:jsGlobal:1",
			kind: "jsGlobal",
			property: "ihfJquery",
			description: "Page-owned global matches a known technology marker.",
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
