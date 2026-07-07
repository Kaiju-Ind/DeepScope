import type { TechnologyDefinition } from '../../types';

export const chitikaTechnologyDefinition = {
	id: "chitika",
	name: "Chitika",
	website: "https://chitika.com",
	icon: "Chitika.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "chitika:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.chitika\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chitika:jsGlobal:1",
			kind: "jsGlobal",
			property: "ch_client",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chitika:jsGlobal:2",
			kind: "jsGlobal",
			property: "ch_color_site_link",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
