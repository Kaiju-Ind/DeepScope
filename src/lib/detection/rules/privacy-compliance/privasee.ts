import type { TechnologyDefinition } from '../../types';

export const privaseeTechnologyDefinition = {
	id: "privasee",
	name: "Privasee",
	website: "https://www.privasee.io",
	description: "Privasee is a self-compliance tool designed to simplify GDPR for SMEs, enabling them to understand their data and mitigate risks effectively.",
	icon: "Privasee.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "privasee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.privasee\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "privasee:jsGlobal:1",
			kind: "jsGlobal",
			property: "privasee",
			description: "Page-owned global matches a known technology marker.",
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
