import type { TechnologyDefinition } from '../../types';

export const gokwikTechnologyDefinition = {
	id: "gokwik",
	name: "GoKwik",
	website: "https://www.gokwik.co",
	description: "GoKwik is a platform for solving shopping experience problems on ecommerce websites on the internet.",
	icon: "GoKwik.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "gokwik:jsGlobal:0",
			kind: "jsGlobal",
			property: "gokwikBuyNow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gokwik:jsGlobal:1",
			kind: "jsGlobal",
			property: "gokwikCheckoutApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gokwik:jsGlobal:2",
			kind: "jsGlobal",
			property: "gokwikSdk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
