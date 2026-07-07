import type { TechnologyDefinition } from '../../types';

export const adscaleTechnologyDefinition = {
	id: "adscale",
	name: "AdScale",
	website: "https://www.adscale.com",
	description: "AdScale is a cloud-based, AI-powered performance optimisation platform which utilises machine learning to automate and optimise AdWords campaigns across Google Search, Google Shopping, Google Display, and YouTube.",
	icon: "AdScale.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adscale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adscale\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adscale:jsGlobal:1",
			kind: "jsGlobal",
			property: "_adscale",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adscale:jsGlobal:2",
			kind: "jsGlobal",
			property: "adscaleAddToCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adscale:jsGlobal:3",
			kind: "jsGlobal",
			property: "adscaleViewProduct",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
