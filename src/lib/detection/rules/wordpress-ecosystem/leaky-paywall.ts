import type { TechnologyDefinition } from '../../types';

export const leakyPaywallTechnologyDefinition = {
	id: "leaky-paywall",
	name: "Leaky Paywall",
	website: "https://leakypaywall.com",
	description: "Leaky Paywall is a metered paywall system for WordPress websites that limits user access to content based on predefined viewing thresholds and subscription rules.",
	icon: "LeakyPaywall.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "leaky-paywall:jsGlobal:0",
			kind: "jsGlobal",
			property: "leaky_paywall_quick_register",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leaky-paywall:jsGlobal:1",
			kind: "jsGlobal",
			property: "leaky_paywall_recurring",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
