import type { TechnologyDefinition } from '../../types';

export const shopboxAiTechnologyDefinition = {
	id: "shopbox-ai",
	name: "Shopbox AI",
	website: "https://www.shopbox.ai",
	description: "Shopbox AI is a tool that helps online retailers improve customer engagement, increase conversion rates, and enhance retention through data-driven insights.",
	icon: "ShopboxAI.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "shopbox-ai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("widget\\.shopbox\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
