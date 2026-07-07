import type { TechnologyDefinition } from '../../types';

export const pepperCloudTechnologyDefinition = {
	id: "pepper-cloud",
	name: "Pepper Cloud",
	website: "https://peppercloud.com",
	description: "Pepper Cloud is a SaaS provider offering CRM solutions for small and middle scale companies across multiple industries.",
	icon: "PepperCloud.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "pepper-cloud:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.peppercloud.com/'], text[id*='Powered_by_Pepper_Cloud'] [data-name*='Powered by Pepper Cloud']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
