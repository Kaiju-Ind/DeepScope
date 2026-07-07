import type { TechnologyDefinition } from '../../types';

export const vantaTechnologyDefinition = {
	id: "vanta",
	name: "Vanta",
	website: "https://www.vanta.com",
	description: "Vanta is a compliance automation platform for SOC 2, HIPAA, ISO 27001, PCI, and GDPR.",
	icon: "Vanta.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "vanta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.vanta\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
