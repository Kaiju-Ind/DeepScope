import type { TechnologyDefinition } from '../../types';

export const ritekitTechnologyDefinition = {
	id: "ritekit",
	name: "RiteKit",
	website: "https://ritekit.com",
	description: "RiteKit is a tool that enhances social media engagement by optimizing calls-to-action (CTAs), generating relevant hashtags, and integrating with social media management systems to streamline content distribution and audience interaction.",
	icon: "RiteKit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ritekit:dom:0",
			kind: "dom",
			selector: "iframe[src*='cdn.ritekit.com/']",
			description: "DOM selector matches a known technology marker.",
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
