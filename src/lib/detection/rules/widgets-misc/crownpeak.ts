import type { TechnologyDefinition } from '../../types';

export const crownpeakTechnologyDefinition = {
	id: "crownpeak",
	name: "CrownPeak",
	website: "https://www.crownpeak.com",
	description: "CrownPeak is a cloud-based Digital Experience Management (DEM) platform that is designed to in the management of digital experiences across multiple touch-points, especially for marketing and a freer IT architecture.",
	icon: "CrownPeak.png",
	categories: [
		"widgets-misc",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "crownpeak:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/crownpeak\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crownpeak:jsGlobal:1",
			kind: "jsGlobal",
			property: "CrownPeakAutocomplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crownpeak:jsGlobal:2",
			kind: "jsGlobal",
			property: "CrownPeakSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crownpeak:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("crownpeak\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
