import type { TechnologyDefinition } from '../../types';

export const easeljsTechnologyDefinition = {
	id: "easeljs",
	name: "EaselJS",
	website: "https://createjs.com/easeljs",
	description: "EaselJS is a JavaScript library designed to simplify working with the HTML5 Canvas element, making it useful for creating games, generative art, and other graphical applications.",
	icon: "EaselJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "easeljs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/easeljs\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
