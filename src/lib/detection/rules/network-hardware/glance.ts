import type { TechnologyDefinition } from '../../types';

export const glanceTechnologyDefinition = {
	id: "glance",
	name: "Glance",
	website: "https://www.glance.cx",
	description: "Glance is a screen sharing and co-browsing solution for sales, service, and support.",
	icon: "Glance.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "glance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.glancecdn\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
