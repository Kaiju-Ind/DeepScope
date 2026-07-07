import type { TechnologyDefinition } from '../../types';

export const maestraTechnologyDefinition = {
	id: "maestra",
	name: "Maestra",
	website: "https://maestra.io",
	description: "Maestra is an all-in-one marketing platform designed to support the growth and scaling of brands.",
	icon: "Maestra.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "maestra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.maestra\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maestra:jsGlobal:1",
			kind: "jsGlobal",
			property: "maestra.queue",
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
