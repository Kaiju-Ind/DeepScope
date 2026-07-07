import type { TechnologyDefinition } from '../../types';

export const divideTechnologyDefinition = {
	id: "divide",
	name: "Divide",
	website: "https://www.divide.nl",
	description: "Divide is an ecommerce platform developed in the Netherlands.",
	icon: "Divide.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "divide:jsGlobal:0",
			kind: "jsGlobal",
			property: "divide.cookies",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "divide:jsGlobal:1",
			kind: "jsGlobal",
			property: "setDivideCookiePreferences",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
