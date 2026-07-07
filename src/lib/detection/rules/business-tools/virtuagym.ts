import type { TechnologyDefinition } from '../../types';

export const virtuagymTechnologyDefinition = {
	id: "virtuagym",
	name: "Virtuagym",
	website: "https://business.virtuagym.com",
	description: "Virtuagym is a cloud-based membership management and coaching platform designed for personal trainers and fitness businesses of all sizes.",
	icon: "Virtuagym.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "virtuagym:dom:0",
			kind: "dom",
			selector: "a[href*='.virtuagym.com'][target='_blank'], iframe[src*='.virtuagym.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "virtuagym:jsGlobal:1",
			kind: "jsGlobal",
			property: "VGTutorial",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "virtuagym:jsGlobal:2",
			kind: "jsGlobal",
			property: "open_vg_custom_modal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "virtuagym:jsGlobal:3",
			kind: "jsGlobal",
			property: "trigger_vg_neutral_message",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
