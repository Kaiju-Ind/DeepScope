import type { TechnologyDefinition } from '../../types';

export const salesforceInteractionStudioTechnologyDefinition = {
	id: "salesforce-interaction-studio",
	name: "Salesforce Interaction Studio",
	website: "https://www.salesforce.com/products/marketing-cloud/customer-interaction",
	description: "Salesforce Interaction Studio (formerly Evergage) is a cloud-based software that allows users to collect, analyze, and respond to user behavior on their websites and web applications in real-time.",
	icon: "Salesforce.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "salesforce-interaction-studio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.evgnet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesforce-interaction-studio:jsGlobal:1",
			kind: "jsGlobal",
			property: "Evergage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-interaction-studio:jsGlobal:2",
			kind: "jsGlobal",
			property: "evergageHideSections",
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
