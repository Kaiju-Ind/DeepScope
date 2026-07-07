import type { TechnologyDefinition } from '../../types';

export const prommtTechnologyDefinition = {
	id: "prommt",
	name: "Prommt",
	website: "https://www.prommt.com",
	description: "Prommt is a payment request service that helps businesses collect payments from customers through card and bank transfer.",
	icon: "Prommt.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "prommt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.prommt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prommt:jsGlobal:1",
			kind: "jsGlobal",
			property: "Prommt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
