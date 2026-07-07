import type { TechnologyDefinition } from '../../types';

export const tictailTechnologyDefinition = {
	id: "tictail",
	name: "Tictail",
	website: "https://tictail.com",
	icon: "tictail.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tictail:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]*tictail\\.com"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
