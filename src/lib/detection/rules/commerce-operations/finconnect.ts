import type { TechnologyDefinition } from '../../types';

export const finconnectTechnologyDefinition = {
	id: "finconnect",
	name: "FinConnect",
	website: "https://finconnect.nl",
	description: "FinConnect is a platform that enables financial transactions and connections between individuals and businesses, supporting money management and access to related services.",
	icon: "FinConnect.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "finconnect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.finconnect\\.nl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "finconnect:jsGlobal:1",
			kind: "jsGlobal",
			property: "FinConnect.documentReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
