import type { TechnologyDefinition } from '../../types';

export const posterousTechnologyDefinition = {
	id: "posterous",
	name: "Posterous",
	website: "https://posterous.com",
	icon: "Posterous.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "posterous:html:0",
			kind: "html",
			pattern: new RegExp("<div class=\"posterous"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "posterous:jsGlobal:1",
			kind: "jsGlobal",
			property: "Posterous",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "posterous:dom:2",
			kind: "dom",
			selector: "div[class*='posterous']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
