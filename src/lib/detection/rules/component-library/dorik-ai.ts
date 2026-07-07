import type { TechnologyDefinition } from '../../types';

export const dorikAiTechnologyDefinition = {
	id: "dorik-ai",
	name: "Dorik AI",
	website: "https://dorik.com",
	description: "Dorik is an AI website-building platform that requires no design or coding experience.",
	icon: "DorikAI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "dorik-ai:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.dorik.com'], section[class*='dorik-section'] ",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
