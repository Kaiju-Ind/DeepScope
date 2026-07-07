import type { TechnologyDefinition } from '../../types';

export const fondueTechnologyDefinition = {
	id: "fondue",
	name: "Fondue",
	website: "https://www.getfondue.com",
	description: "Fondue is a platform that helps businesses drive profitable growth by ditching discount codes and giving cash back instead.",
	icon: "Fondue.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "fondue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("public\\.getfondue\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fondue:jsGlobal:1",
			kind: "jsGlobal",
			property: "Fondue",
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
