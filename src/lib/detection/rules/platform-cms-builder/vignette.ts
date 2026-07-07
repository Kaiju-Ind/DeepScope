import type { TechnologyDefinition } from '../../types';

export const vignetteTechnologyDefinition = {
	id: "vignette",
	name: "Vignette",
	website: "https://www.vignette.com",
	icon: "Vignette.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vignette:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+=\"vgn-?ext"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
