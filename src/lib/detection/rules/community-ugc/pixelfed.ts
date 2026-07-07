import type { TechnologyDefinition } from '../../types';

export const pixelfedTechnologyDefinition = {
	id: "pixelfed",
	name: "PixelFed",
	website: "https://pixelfed.org",
	description: "PixelFed is an activitypub based image sharing platform.",
	icon: "PixelFed.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "pixelfed:dom:0",
			kind: "dom",
			selector: "a[href='pixelfed.org'][title*='version']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pixelfed:text:1",
			kind: "text",
			pattern: new RegExp("^Powered by Pixelfed$"),
			description: "Page text contains a known technology marker.",
		},
	],
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
