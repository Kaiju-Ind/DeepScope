import type { TechnologyDefinition } from '../../types';

export const stellantisTechnologyDefinition = {
	id: "stellantis",
	name: "Stellantis",
	website: "https://www.stellantis.com",
	description: "Stellantis is a global automaker and provider of mobility solutions.",
	icon: "Stellantis.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stellantis:jsGlobal:0",
			kind: "jsGlobal",
			property: "stellantis_d2_library",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stellantis:jsGlobal:1",
			kind: "jsGlobal",
			property: "stellantis_whitelabel_library",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stellantis:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkstellantis_d2_library",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
