import type { TechnologyDefinition } from '../../types';

export const bowtieTechnologyDefinition = {
	id: "bowtie",
	name: "Bowtie",
	website: "https://www.bowtie.ai",
	description: "Bowtie is an AI-based messaging platform for businesses that allows customers to book appointments, buy products, and ask questions.",
	icon: "Bowtie.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bowtie:dom:0",
			kind: "dom",
			selector: "div#bowtie-widget-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bowtie:jsGlobal:1",
			kind: "jsGlobal",
			property: "bowtieDataToken",
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
