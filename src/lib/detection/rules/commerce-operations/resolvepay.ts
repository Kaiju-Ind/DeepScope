import type { TechnologyDefinition } from '../../types';

export const resolvepayTechnologyDefinition = {
	id: "resolvepay",
	name: "ResolvePay",
	website: "https://resolvepay.com/b2b-payments",
	description: "Resolve Pay is a platform that provides 30 to 60 day net terms financing for B2B merchants and buyers.",
	icon: "ResolvePay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "resolvepay:jsGlobal:0",
			kind: "jsGlobal",
			property: "as_resolveEnvironmentURL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
