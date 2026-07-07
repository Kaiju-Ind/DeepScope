import type { TechnologyDefinition } from '../../types';

export const retinaJsTechnologyDefinition = {
	id: "retina-js",
	name: "Retina.js",
	website: "https://imulus.github.io/retinajs",
	description: "Retina.js is an open-source script designed to facilitate the delivery of high-resolution images to devices with retina displays.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "retina-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/retina(\\.min)?\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "retina-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "RetinaImage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retina-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "retinajs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
