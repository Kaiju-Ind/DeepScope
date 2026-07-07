import type { TechnologyDefinition } from '../../types';

export const photoslurpTechnologyDefinition = {
	id: "photoslurp",
	name: "Photoslurp",
	website: "https://hi.photoslurp.com",
	description: "Photoslurp is a visual commerce platform that collects photos and videos of customers using your products from across social networks.",
	icon: "Photoslurp.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "photoslurp:jsGlobal:0",
			kind: "jsGlobal",
			property: "Photoslurp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "photoslurp:jsGlobal:1",
			kind: "jsGlobal",
			property: "photoSlurpWidgetSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "photoslurp:jsGlobal:2",
			kind: "jsGlobal",
			property: "photoslurp_script",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "photoslurp:jsGlobal:3",
			kind: "jsGlobal",
			property: "photoslurp_wdgts",
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
