import type { TechnologyDefinition } from '../../types';

export const cocoAiTechnologyDefinition = {
	id: "coco-ai",
	name: "CoCo AI",
	website: "https://my-coco.ai",
	description: "CoCo AI is a WhatsApp marketing assistant that uses artificial intelligence to automate campaigns, manage customer interactions, and improve engagement.",
	icon: "CoCoAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "coco-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dashboard\\.my-coco\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
