import type { TechnologyDefinition } from '../../types';

export const leadForensicsTechnologyDefinition = {
	id: "lead-forensics",
	name: "Lead Forensics",
	website: "https://www.leadforensics.com",
	description: "Lead Forensics is a B2B website visitor identification software that processes website traffic data to reveal the companies behind each visit.",
	icon: "LeadForensics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "lead-forensics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.leadforensics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
