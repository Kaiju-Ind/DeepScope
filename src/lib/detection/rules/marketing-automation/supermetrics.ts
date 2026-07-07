import type { TechnologyDefinition } from '../../types';

export const supermetricsTechnologyDefinition = {
	id: "supermetrics",
	name: "Supermetrics",
	website: "https://supermetrics.com",
	description: "Formerly Relay42, Supermetrics is a customer data platform that unifies cross-channel customer data in real time and supports personalization, audience segmentation, and journey orchestration across digital touchpoints.",
	icon: "Supermetrics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "supermetrics:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.r42tag\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "supermetrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "Relay42Min",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
