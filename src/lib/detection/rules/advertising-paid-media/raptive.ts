import type { TechnologyDefinition } from '../../types';

export const raptiveTechnologyDefinition = {
	id: "raptive",
	name: "Raptive",
	website: "https://raptive.com",
	description: "Raptive is a company formed from the merger of CafeMedia, AdThrive, and CafeMedia Ad Management, focusing on supporting digital creators and publishers​.",
	icon: "Raptive.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "raptive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ads\\.adthrive\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "raptive:jsGlobal:1",
			kind: "jsGlobal",
			property: "adthrive",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raptive:jsGlobal:2",
			kind: "jsGlobal",
			property: "adthriveVideosInjected",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
