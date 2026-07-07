import type { TechnologyDefinition } from '../../types';

export const iprestaTechnologyDefinition = {
	id: "ipresta",
	name: "iPresta",
	website: "https://ipresta.ir",
	icon: "iPresta.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ipresta:meta:0",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("iPresta", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ipresta:meta:1",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("ipresta", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
		"prestashop",
	],
} as const satisfies TechnologyDefinition;
