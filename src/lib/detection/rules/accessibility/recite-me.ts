import type { TechnologyDefinition } from '../../types';

export const reciteMeTechnologyDefinition = {
	id: "recite-me",
	name: "Recite Me",
	website: "https://reciteme.com/",
	description: "Recite Me is a web accessibility overlay that claims to allow website visitors to customize a site in a way that works for them.",
	icon: "Recite Me.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "recite-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.reciteme\\.com\\/asset\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
