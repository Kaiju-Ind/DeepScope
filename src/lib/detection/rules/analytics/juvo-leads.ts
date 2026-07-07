import type { TechnologyDefinition } from '../../types';

export const juvoLeadsTechnologyDefinition = {
	id: "juvo-leads",
	name: "Juvo Leads",
	website: "https://juvoleads.com",
	description: "Juvo Leads is a platform that integrates hosted chat, call tracking, and form tracking into a unified reporting system.",
	icon: "JuvoLeads.svg",
	categories: [
		"analytics",
		"email-messaging",
	],
	rules: [
		{
			id: "juvo-leads:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.juvoleads\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
