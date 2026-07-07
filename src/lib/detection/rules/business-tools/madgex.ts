import type { TechnologyDefinition } from '../../types';

export const madgexTechnologyDefinition = {
	id: "madgex",
	name: "Madgex",
	website: "https://madgex.com",
	description: "Madgex is a job board software platform used to create, manage, and monetize online employment marketplaces.",
	icon: "Madgex.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "madgex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.madgex\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "madgex:jsGlobal:1",
			kind: "jsGlobal",
			property: "MADGEXi18n",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "madgex:jsGlobal:2",
			kind: "jsGlobal",
			property: "runMadgexConfirmSession",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
