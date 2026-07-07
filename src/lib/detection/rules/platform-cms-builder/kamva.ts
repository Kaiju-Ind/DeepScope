import type { TechnologyDefinition } from '../../types';

export const kamvaTechnologyDefinition = {
	id: "kamva",
	name: "Kamva",
	website: "https://kamva.ir",
	icon: "Kamva.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kamva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mykamva\\.ir"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kamva:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kamva",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kamva:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("[CK]amva", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kamva:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("[ck]amva", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
