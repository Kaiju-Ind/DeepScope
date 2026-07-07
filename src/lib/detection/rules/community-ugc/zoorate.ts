import type { TechnologyDefinition } from '../../types';

export const zoorateTechnologyDefinition = {
	id: "zoorate",
	name: "Zoorate",
	website: "https://zoorate.com",
	description: "Zoorate is a user-generated content sharing service tailored for retailers, facilitating the exchange of customer experiences and feedback.",
	icon: "Zoorate.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "zoorate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.zoorate\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoorate:jsGlobal:1",
			kind: "jsGlobal",
			property: "zoorate_params",
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
