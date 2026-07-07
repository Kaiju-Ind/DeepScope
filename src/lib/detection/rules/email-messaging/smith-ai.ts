import type { TechnologyDefinition } from '../../types';

export const smithAiTechnologyDefinition = {
	id: "smith-ai",
	name: "Smith.ai",
	website: "https://smith.ai",
	description: "Smith.ai is a receptionist service combining AI and human call handling to manage business communications across various scenarios.",
	icon: "SmithAI.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "smith-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.smith\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smith-ai:dom:1",
			kind: "dom",
			selector: "link[href*='app.smith.ai']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "smith-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "SMITH.chat",
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
} as const satisfies TechnologyDefinition;
