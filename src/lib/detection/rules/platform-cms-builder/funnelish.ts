import type { TechnologyDefinition } from '../../types';

export const funnelishTechnologyDefinition = {
	id: "funnelish",
	name: "Funnelish",
	website: "https://funnelish.com",
	description: "Funnelish is a software tool that helps businesses create and optimise sales funnels for their websites to increase their conversion rates and revenue. Funnelish page builder is a funnel builder focused on building ecommerce funnels.",
	icon: "Funnelish.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "funnelish:jsGlobal:0",
			kind: "jsGlobal",
			property: "funnelish",
			description: "Page-owned global matches a known technology marker.",
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
