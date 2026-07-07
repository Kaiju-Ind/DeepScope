import type { TechnologyDefinition } from '../../types';

export const mimiranTechnologyDefinition = {
	id: "mimiran",
	name: "Mimiran",
	website: "https://www.mimiran.com",
	description: "Mimiran is a CRM system designed for managing customer relationships.",
	icon: "Mimiran.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mimiran:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mimiran\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mimiran:jsGlobal:1",
			kind: "jsGlobal",
			property: "mimiran_widget_show",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
