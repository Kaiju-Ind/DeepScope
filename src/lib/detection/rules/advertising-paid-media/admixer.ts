import type { TechnologyDefinition } from '../../types';

export const admixerTechnologyDefinition = {
	id: "admixer",
	name: "Admixer",
	website: "https://admixer.com",
	description: "Admixer is an independent adtech company developing an ecosystem of full-stack programmatic solutions.",
	icon: "Admixer.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "admixer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.admixer\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "admixer:jsGlobal:1",
			kind: "jsGlobal",
			property: "admixerAds",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "admixer:jsGlobal:2",
			kind: "jsGlobal",
			property: "admixerML",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
