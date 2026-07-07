import type { TechnologyDefinition } from '../../types';

export const citizenSpaceTechnologyDefinition = {
	id: "citizen-space",
	name: "Citizen Space",
	website: "https://www.delib.net/citizen_space",
	description: "Citizen Space is an engagement platform by Delib that enhances democratic processes globally.",
	icon: "CitizenSpace.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "citizen-space:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/vendor\\/dlb-admin-ui\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "citizen-space:dom:1",
			kind: "dom",
			selector: "a[href='https://www.delib.net/citizen_space']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "citizen-space:jsGlobal:2",
			kind: "jsGlobal",
			property: "cs_embedded_content",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
