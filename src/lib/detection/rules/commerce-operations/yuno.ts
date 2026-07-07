import type { TechnologyDefinition } from '../../types';

export const yunoTechnologyDefinition = {
	id: "yuno",
	name: "Yuno",
	website: "https://y.uno/",
	description: "Yuno is a global payment orchestrator used by checkout platforms to optimize payment processing and enhance transaction performance.",
	icon: "Yuno.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "yuno:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk-web\\.y\\.uno"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yuno:jsGlobal:1",
			kind: "jsGlobal",
			property: "Yuno.threeDSecure",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
