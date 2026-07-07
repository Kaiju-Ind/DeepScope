import type { TechnologyDefinition } from '../../types';

export const mojoHelpdeskTechnologyDefinition = {
	id: "mojo-helpdesk",
	name: "Mojo Helpdesk",
	website: "https://mojohelpdesk.com",
	description: "Mojo Helpdesk is a ticketing system used to centralize requests, assign tasks, automate workflows, and track progress for improved organization.",
	icon: "MojoHelpdesk.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "mojo-helpdesk:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("asset\\.mojohelpdesk\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mojo-helpdesk:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("asset\\.mojohelpdesk\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
