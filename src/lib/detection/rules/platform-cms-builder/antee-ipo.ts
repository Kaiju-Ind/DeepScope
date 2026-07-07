import type { TechnologyDefinition } from '../../types';

export const anteeIpoTechnologyDefinition = {
	id: "antee-ipo",
	name: "Antee IPO",
	website: "https://ipo.antee.cz",
	description: "Antee is a Czech company that will make a custom-made website for you, then you manage it in CMS IPO.",
	icon: "Antee.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "antee-ipo:jsGlobal:0",
			kind: "jsGlobal",
			property: "ipo.api.hideSpinner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "antee-ipo:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Antee\\ss\\.r\\.o\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "antee-ipo:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("antee\\ss\\.r\\.o\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
