import type { TechnologyDefinition } from '../../types';

export const meiqiaTechnologyDefinition = {
	id: "meiqia",
	name: "Meiqia",
	website: "https://www.meiqia.com",
	description: "Maiqia is an account-based customer relationship management (CRM) solution developed in Asia for managing client accounts, sales processes, and business interactions within a centralized platform.",
	icon: "Meiqia.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "meiqia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.meiqia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "meiqia:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("static\\.meiqia\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
