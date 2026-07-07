import type { TechnologyDefinition } from '../../types';

export const shopatronTechnologyDefinition = {
	id: "shopatron",
	name: "Shopatron",
	website: "https://ecommerce.shopatron.com",
	icon: "Shopatron.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopatron:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mediacdn\\.shopatron\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopatron:html:1",
			kind: "html",
			pattern: new RegExp("<body class=\"shopatron"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shopatron:html:2",
			kind: "html",
			pattern: new RegExp("<img[^>]+mediacdn\\.shopatron\\.com"),
			confidence: 50,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shopatron:jsGlobal:3",
			kind: "jsGlobal",
			property: "shptUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopatron:meta:4",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("Shopatron", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopatron:dom:5",
			kind: "dom",
			selector: "body[class*='shopatron']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shopatron:meta:6",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("shopatron", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
