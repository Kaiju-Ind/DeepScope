import type { TechnologyDefinition } from '../../types';

export const solidpixelsTechnologyDefinition = {
	id: "solidpixels",
	name: "SolidPixels",
	website: "https://www.solidpixels.net",
	description: "Solidpixels is platform to build websites.",
	icon: "SolidPixels.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "solidpixels:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/cdn\\.solidpixels\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solidpixels:meta:1",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^solidpixels", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
