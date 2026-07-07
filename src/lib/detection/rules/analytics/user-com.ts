import type { TechnologyDefinition } from '../../types';

export const userComTechnologyDefinition = {
	id: "user-com",
	name: "user.com",
	website: "https://user.com",
	icon: "user.com.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "user-com:html:0",
			kind: "html",
			pattern: new RegExp("<div[^>]+\\/id=\"ue_widget\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "user-com:jsGlobal:1",
			kind: "jsGlobal",
			property: "UserEngage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "user-com:dom:2",
			kind: "dom",
			selector: "div[id*='ue_widget']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
