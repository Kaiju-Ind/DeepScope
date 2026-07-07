import type { TechnologyDefinition } from '../../types';

export const trustpilotTechnologyDefinition = {
	id: "trustpilot",
	name: "Trustpilot",
	website: "https://business.trustpilot.com",
	description: "Trustpilot is a Danish consumer review website which provide embed stand-alone applications in your website to show your most recent reviews, TrustScore, and star ratings.",
	icon: "Trustpilot.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustpilot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trustpilot\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trustpilot:jsGlobal:1",
			kind: "jsGlobal",
			property: "Trustpilot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
