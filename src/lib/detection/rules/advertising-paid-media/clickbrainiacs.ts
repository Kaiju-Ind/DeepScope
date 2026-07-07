import type { TechnologyDefinition } from '../../types';

export const clickbrainiacsTechnologyDefinition = {
	id: "clickbrainiacs",
	name: "Clickbrainiacs",
	website: "https://www.clickbrainiacs.com",
	description: "Clickbrainiacs is a click fraud monitoring software for AdWords PPC campaigns that detects and helps prevent invalid or malicious ad clicks.",
	icon: "Clickbrainiacs.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "clickbrainiacs:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.clickbrainiacs\\.com"),
			description: "Script content contains a bounded technology signature.",
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
