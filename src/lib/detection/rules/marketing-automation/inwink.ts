import type { TechnologyDefinition } from '../../types';

export const inwinkTechnologyDefinition = {
	id: "inwink",
	name: "Inwink",
	website: "https://www.inwink.com",
	description: "Inwink is an event management platform for creating, managing, and scaling events.",
	icon: "Inwink.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "inwink:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.inwink\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inwink:jsGlobal:1",
			kind: "jsGlobal",
			property: "inwink.absoluteUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "inwink:jsGlobal:2",
			kind: "jsGlobal",
			property: "inwinkEventContainer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
