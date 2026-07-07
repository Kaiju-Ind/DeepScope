import type { TechnologyDefinition } from '../../types';

export const veraTechnologyDefinition = {
	id: "vera",
	name: "Vera",
	website: "https://www.getvera.ai",
	description: "Vera (formerly Privasee) is a self-compliance tool designed to simplify GDPR for SMEs, enabling them to understand their data and mitigate risks effectively.",
	icon: "Vera.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "vera:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.privasee\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vera:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getvera\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vera:jsGlobal:2",
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
