import type { TechnologyDefinition } from '../../types';

export const recartTechnologyDefinition = {
	id: "recart",
	name: "Recart",
	website: "https://recart.com/",
	description: "Recart is a tool to engage users who abandoned their shopping cart via Facebook Messenger.",
	icon: "Recart.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "recart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.recart\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recart:jsGlobal:1",
			kind: "jsGlobal",
			property: "__recart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recart:jsGlobal:2",
			kind: "jsGlobal",
			property: "recart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
