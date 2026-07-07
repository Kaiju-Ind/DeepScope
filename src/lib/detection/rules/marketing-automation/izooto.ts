import type { TechnologyDefinition } from '../../types';

export const izootoTechnologyDefinition = {
	id: "izooto",
	name: "Izooto",
	website: "https://www.izooto.com",
	description: "iZooto is a user engagement and retention tool that leverages web push notifications to help business to drive repeat traffic, leads and sales.",
	icon: "Izooto.png",
	categories: [
		"marketing-automation",
		"widgets-misc",
	],
	rules: [
		{
			id: "izooto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.izooto\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "izooto:jsGlobal:1",
			kind: "jsGlobal",
			property: "Izooto",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "izooto:jsGlobal:2",
			kind: "jsGlobal",
			property: "_izooto",
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
