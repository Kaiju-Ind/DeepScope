import type { TechnologyDefinition } from '../../types';

export const oneyTechnologyDefinition = {
	id: "oney",
	name: "Oney",
	website: "https://www.oney.com",
	description: "Oney is an app that gives consumers back the power over their spending and makes split payments universal.",
	icon: "Oney.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "oney:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/modules\\/oney(?:\\/)?\\/views\\/js\\/front\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oney:jsGlobal:1",
			kind: "jsGlobal",
			property: "OneyMarketplace",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oney:jsGlobal:2",
			kind: "jsGlobal",
			property: "isOneyActive",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oney:jsGlobal:3",
			kind: "jsGlobal",
			property: "openOneyLayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
