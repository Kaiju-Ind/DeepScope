import type { TechnologyDefinition } from '../../types';

export const legalMonsterTechnologyDefinition = {
	id: "legal-monster",
	name: "Legal Monster",
	website: "https://www.legalmonster.com",
	description: "Legal Monster is a consent and privacy management solution, which helps businesses maintain compliance with ePrivacy, marketing requirements and General Data Protection Regulation (GDPR).",
	icon: "Legal Monster.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "legal-monster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.legalmonster\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "legal-monster:jsGlobal:1",
			kind: "jsGlobal",
			property: "legal.__VERSION__",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
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
