import type { TechnologyDefinition } from '../../types';

export const cremaTechnologyDefinition = {
	id: "crema",
	name: "CREMA",
	website: "https://www.cre.ma",
	description: "CREMA is a platform offering review management, marketing personalisation, and size recommendations to enhance and streamline the consumer journey.",
	icon: "CREMA.svg",
	categories: [
		"experimentation-optimization",
		"community-ugc",
	],
	rules: [
		{
			id: "crema:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/widgets\\.cre\\.ma\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crema:jsGlobal:1",
			kind: "jsGlobal",
			property: "CremaCryptoJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crema:jsGlobal:2",
			kind: "jsGlobal",
			property: "crema.AdTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
