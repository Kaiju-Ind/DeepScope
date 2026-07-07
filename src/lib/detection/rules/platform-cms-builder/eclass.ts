import type { TechnologyDefinition } from '../../types';

export const eclassTechnologyDefinition = {
	id: "eclass",
	name: "eClass",
	website: "https://www.eclass.com.hk",
	description: "eClass is an online learning platform.",
	icon: "eClass.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eclass:jsGlobal:0",
			kind: "jsGlobal",
			property: "fe_eclass",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eclass:jsGlobal:1",
			kind: "jsGlobal",
			property: "fe_eclass_guest",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
