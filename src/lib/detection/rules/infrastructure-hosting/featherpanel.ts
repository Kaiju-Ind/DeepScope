import type { TechnologyDefinition } from '../../types';

export const featherpanelTechnologyDefinition = {
	id: "featherpanel",
	name: "FeatherPanel",
	website: "https://featherpanel.com",
	description: "FeatherPanel is an open-source game server management panel built with PHP, Vue, and Go.",
	icon: "FeatherPanel.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "featherpanel:jsGlobal:0",
			kind: "jsGlobal",
			property: "FeatherPanel.api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "featherpanel:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^FeatherPanel$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "featherpanel:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^featherpanel$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
