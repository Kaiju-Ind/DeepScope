import type { TechnologyDefinition } from '../../types';

export const paymentusTechnologyDefinition = {
	id: "paymentus",
	name: "Paymentus",
	website: "https://www.paymentus.com",
	description: "Paymentus is a platform that provides a complete electronic billing and payment solution for businesses and organizations.",
	icon: "Paymentus.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paymentus:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.paymentus\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "paymentus:jsGlobal:1",
			kind: "jsGlobal",
			property: "PaymentusFeedback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
