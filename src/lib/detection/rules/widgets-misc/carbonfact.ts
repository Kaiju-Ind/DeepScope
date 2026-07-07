import type { TechnologyDefinition } from '../../types';

export const carbonfactTechnologyDefinition = {
	id: "carbonfact",
	name: "Carbonfact",
	website: "https://www.carbonfact.com",
	description: "Carbonfact is a platform for fashion brands to manage their carbon emissions. It enables the measurement, reporting, and reduction of emissions in the apparel, textile, leather, and luxury sectors.",
	icon: "Carbonfact.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "carbonfact:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.carbonfact\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "carbonfact:jsGlobal:1",
			kind: "jsGlobal",
			property: "carbonfact.refreshModule",
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
