import type { TechnologyDefinition } from '../../types';

export const powaTechnologyDefinition = {
	id: "powa",
	name: "Powa",
	website: "https://powa.com",
	description: "Powa is a site speed plugin for WordPress that operates its own Content Delivery Network (CDN) to enhance website performance and reduce loading times.",
	icon: "Powa.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "powa:jsGlobal:0",
			kind: "jsGlobal",
			property: "powaHealthCheck",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "powa:jsGlobal:1",
			kind: "jsGlobal",
			property: "powaInitAssets",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "powa:jsGlobal:2",
			kind: "jsGlobal",
			property: "powaOnLoadJs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "powa:jsGlobal:3",
			kind: "jsGlobal",
			property: "powaSyncLoadScripts",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
