import type { TechnologyDefinition } from '../../types';

export const i30conTechnologyDefinition = {
	id: "i30con",
	name: "i30con",
	website: "https://30nama.com/",
	description: "i30con is an icon toolkit based on CSS and JavaScript.",
	icon: "30namaPlayer.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "i30con:dom:0",
			kind: "dom",
			selector: "[class^='i30con']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
