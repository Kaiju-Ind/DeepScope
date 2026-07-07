import type { TechnologyDefinition } from '../../types';

export const incidentIoTechnologyDefinition = {
	id: "incident-io",
	name: "Incident.io",
	website: "https://incident.io",
	description: "Incident.io is a Slack-integrated incident management tool used to announce, manage, and resolve all incidents in a single channel.",
	icon: "Incident.io.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "incident-io:header:0",
			kind: "header",
			key: "x-webkit-csp",
			valuePattern: new RegExp("incident-io-team\\.vercel\\.app", "i"),
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
