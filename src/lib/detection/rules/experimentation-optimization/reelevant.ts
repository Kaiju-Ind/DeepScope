import type { TechnologyDefinition } from '../../types';

export const reelevantTechnologyDefinition = {
	id: "reelevant",
	name: "Reelevant",
	website: "https://try.reelevant.com",
	description: "Reelevant is a visual content platform that helps businesses to create on-demand content for their viewers in order to increase conversion rates.",
	icon: "Reelevant.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "reelevant:jsGlobal:0",
			kind: "jsGlobal",
			property: "reel.companyId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reelevant:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.reelevant\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "reelevant:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.reelevant\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
