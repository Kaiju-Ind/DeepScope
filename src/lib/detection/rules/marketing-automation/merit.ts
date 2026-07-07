import type { TechnologyDefinition } from '../../types';

export const meritTechnologyDefinition = {
	id: "merit",
	name: "Merit",
	website: "https://www.meritpages.com",
	description: "Merit is a platform tailored for higher education marketing.",
	icon: "Merit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "merit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.meritpages\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "merit:jsGlobal:1",
			kind: "jsGlobal",
			property: "meritPages",
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
