import type { TechnologyDefinition } from '../../types';

export const workplaceByMetaTechnologyDefinition = {
	id: "workplace-by-meta",
	name: "Workplace by Meta",
	website: "https://www.workplace.com",
	description: "Workplace was an enterprise collaboration and communication platform developed by Meta (formerly Facebook), used for messaging, news feeds, and groups within organisations.",
	icon: "Workplace.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "workplace-by-meta:dns:0",
			kind: "dns",
			valuePattern: new RegExp("workplace-domain-verification=", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
