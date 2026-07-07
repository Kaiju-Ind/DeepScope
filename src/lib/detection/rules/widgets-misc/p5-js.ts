import type { TechnologyDefinition } from '../../types';

export const p5JsTechnologyDefinition = {
	id: "p5-js",
	name: "p5.js",
	website: "https://p5js.org",
	description: "p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else.",
	icon: "p5.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "p5-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:addons\\/)?)?p5(?:\\.sound)?(?:\\.dom)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "p5-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "p5.Camera",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "p5-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "p5.ColorConversion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
