import type { TechnologyDefinition } from '../../types';

export const fontserverTechnologyDefinition = {
	id: "fontserver",
	name: "FontServer",
	website: "https://fontserver.ir",
	description: "FontServer is an online font delivery network service-provider for websites.",
	icon: "FontServer.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "fontserver:dom:0",
			kind: "dom",
			selector: "link[href*='.font']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
