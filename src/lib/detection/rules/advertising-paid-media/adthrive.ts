import type { TechnologyDefinition } from '../../types';

export const adthriveTechnologyDefinition = {
	id: "adthrive",
	name: "AdThrive",
	website: "https://www.adthrive.com",
	description: "AdThrive is an online advertising network aka ad provider for bloggers for blog monetisation.",
	icon: "AdThrive.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adthrive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ads\\.adthrive\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adthrive:jsGlobal:1",
			kind: "jsGlobal",
			property: "adthrive",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adthrive:jsGlobal:2",
			kind: "jsGlobal",
			property: "adthriveVideosInjected",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
