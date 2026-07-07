import type { TechnologyDefinition } from '../../types';

export const userrulesTechnologyDefinition = {
	id: "userrules",
	name: "UserRules",
	website: "https://www.userrules.com",
	icon: "UserRules.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "userrules:jsGlobal:0",
			kind: "jsGlobal",
			property: "_usrp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
