import type { TechnologyDefinition } from '../../types';

export const freshopTechnologyDefinition = {
	id: "freshop",
	name: "Freshop",
	website: "https://www.freshop.com",
	description: "Freshop is an online platform for grocers.",
	icon: "Freshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "freshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("asset(?:cdn)?\\.freshop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "freshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "freshop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freshop:jsGlobal:2",
			kind: "jsGlobal",
			property: "freshopInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freshop:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Freshop, Inc\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "freshop:meta:4",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^freshop, inc\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
