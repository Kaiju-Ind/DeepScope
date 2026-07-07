import type { TechnologyDefinition } from '../../types';

export const wizzyTechnologyDefinition = {
	id: "wizzy",
	name: "Wizzy",
	website: "https://wizzy.ai",
	description: "Wizzy is a tool that simplifies ecommerce site search, enabling users to find relevant products, pages, and information.",
	icon: "Wizzy.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "wizzy:jsGlobal:0",
			kind: "jsGlobal",
			property: "WizzyFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wizzy:jsGlobal:1",
			kind: "jsGlobal",
			property: "foundWizzyConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wizzy:jsGlobal:2",
			kind: "jsGlobal",
			property: "wizzyConfig.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wizzy:jsGlobal:3",
			kind: "jsGlobal",
			property: "wizzyScriptLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
