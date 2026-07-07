import type { TechnologyDefinition } from '../../types';

export const projectWonderfulTechnologyDefinition = {
	id: "project-wonderful",
	name: "Project Wonderful",
	website: "https://projectwonderful.com",
	icon: "Project Wonderful.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "project-wonderful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?projectwonderful\\.com\\/(?:pwa\\.js|gen\\.php)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "project-wonderful:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+id=\"pw_adbox_"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "project-wonderful:jsGlobal:2",
			kind: "jsGlobal",
			property: "pw_adloader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "project-wonderful:dom:3",
			kind: "dom",
			selector: "div[id*='pw_adbox_']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
