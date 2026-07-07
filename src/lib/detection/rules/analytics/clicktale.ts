import type { TechnologyDefinition } from '../../types';

export const clicktaleTechnologyDefinition = {
	id: "clicktale",
	name: "ClickTale",
	website: "https://www.clicktale.com",
	description: "ClickTale is a SaaS solution enabling organisations to gain visual in-page analytics.",
	icon: "ClickTale.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "clicktale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clicktale\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clicktale:jsGlobal:1",
			kind: "jsGlobal",
			property: "ClickTale",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clicktale:jsGlobal:2",
			kind: "jsGlobal",
			property: "ClickTaleEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clicktale:jsGlobal:3",
			kind: "jsGlobal",
			property: "ClickTaleGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clicktale:jsGlobal:4",
			kind: "jsGlobal",
			property: "clickTaleStartEventSignal",
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
