import type { TechnologyDefinition } from '../../types';

export const crexiTechnologyDefinition = {
	id: "crexi",
	name: "Crexi",
	website: "https://www.crexi.com",
	description: "Crexi is a commercial real estate platform that provides property listings with photos, maps, and detailed descriptions.",
	icon: "Crexi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "crexi:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.crexi.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
