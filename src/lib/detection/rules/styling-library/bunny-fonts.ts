import type { TechnologyDefinition } from '../../types';

export const bunnyFontsTechnologyDefinition = {
	id: "bunny-fonts",
	name: "Bunny Fonts",
	website: "https://fonts.bunny.net",
	description: "Bunny Fonts is an open-source, privacy-first web font platform designed to put privacy back into the internet.",
	icon: "Bunny.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "bunny-fonts:dom:0",
			kind: "dom",
			selector: "link[href*='fonts.bunny.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"bunny",
	],
} as const satisfies TechnologyDefinition;
