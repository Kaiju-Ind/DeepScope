import type { TechnologyDefinition } from '../../types';

export const googleWorkspaceTechnologyDefinition = {
	id: "google-workspace",
	name: "Google Workspace",
	website: "https://workspace.google.com/",
	description: "Google Workspace, formerly G Suite, is a collection of cloud computing, productivity and collaboration tools.",
	icon: "Google.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "google-workspace:dns:0",
			kind: "dns",
			valuePattern: new RegExp("aspmx\\.l\\.google\\.com", "i"),
			recordType: "MX",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "google-workspace:dns:1",
			kind: "dns",
			valuePattern: new RegExp("googlemail\\.com", "i"),
			recordType: "MX",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
