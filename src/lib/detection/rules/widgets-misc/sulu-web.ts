import type { TechnologyDefinition } from '../../types';

export const suluWebTechnologyDefinition = {
	id: "sulu-web",
	name: "@sulu/web",
	website: "https://github.com/sulu/web-js",
	icon: "Sulu.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sulu-web:jsGlobal:0",
			kind: "jsGlobal",
			property: "web.startComponents",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
