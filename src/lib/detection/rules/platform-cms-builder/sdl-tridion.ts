import type { TechnologyDefinition } from '../../types';

export const sdlTridionTechnologyDefinition = {
	id: "sdl-tridion",
	name: "SDL Tridion",
	website: "https://www.sdl.com/products/tridion",
	icon: "SDL Tridion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sdl-tridion:html:0",
			kind: "html",
			pattern: new RegExp("<img[^>]+_tcm\\d{2,3}-\\d{6}\\."),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
