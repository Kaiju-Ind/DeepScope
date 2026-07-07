import type { TechnologyDefinition } from '../../types';

export const convertriTechnologyDefinition = {
	id: "convertri",
	name: "Convertri",
	website: "https://www.convertri.com",
	description: "Convertri is a sales funnel building solution.",
	icon: "Convertri.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "convertri:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.convertri\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convertri:jsGlobal:1",
			kind: "jsGlobal",
			property: "CONVERTRI_CONSTANTS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "convertri:jsGlobal:2",
			kind: "jsGlobal",
			property: "ConvertriAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "convertri:jsGlobal:3",
			kind: "jsGlobal",
			property: "convertriParameters",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
