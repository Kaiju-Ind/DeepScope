import type { TechnologyDefinition } from '../../types';

export const twikTechnologyDefinition = {
	id: "twik",
	name: "Twik",
	website: "https://www.twik.io/",
	description: "Twik provides an automated, no-configuration business intelligence & personalization automation engine.",
	icon: "Twik.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "twik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.twik\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twik:jsGlobal:1",
			kind: "jsGlobal",
			property: "TWIK_ID",
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
		cpe: "cpe:2.3:a:twiki:twiki:-:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
