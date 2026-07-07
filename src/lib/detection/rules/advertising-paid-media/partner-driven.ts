import type { TechnologyDefinition } from '../../types';

export const partnerDrivenTechnologyDefinition = {
	id: "partner-driven",
	name: "Partner Driven",
	website: "https://partnerdriven.com",
	description: "Partner Driven is a real estate investment approach that involves partnerships between investors to pool resources and share risks, aimed at maximizing returns through collaborative efforts.",
	icon: "PartnerDriven.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "partner-driven:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.partnerdriven\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
