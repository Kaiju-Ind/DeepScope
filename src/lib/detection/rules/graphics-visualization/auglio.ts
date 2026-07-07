import type { TechnologyDefinition } from '../../types';

export const auglioTechnologyDefinition = {
	id: "auglio",
	name: "Auglio",
	website: "https://auglio.com",
	description: "Auglio is a virtual try-on tool enabling customers to try products using camera and augmented reality before the purchase.",
	icon: "Auglio.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "auglio:jsGlobal:0",
			kind: "jsGlobal",
			property: "VirtooalApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "auglio:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadVirtooalScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "auglio:jsGlobal:2",
			kind: "jsGlobal",
			property: "virtooal_logger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "auglio:jsGlobal:3",
			kind: "jsGlobal",
			property: "virtooal_script_loaded",
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
