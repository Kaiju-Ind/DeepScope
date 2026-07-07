import type { TechnologyDefinition } from '../../types';

export const smartstorePageBuilderTechnologyDefinition = {
	id: "smartstore-page-builder",
	name: "Smartstore Page Builder",
	website: "https://www.smartstore.com",
	icon: "Smartstore.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smartstore-page-builder:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.g-stage \\.g-stage-root"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "smartstore-page-builder:html:1",
			kind: "html",
			pattern: new RegExp("<section[^>]+class=\"g-stage"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "smartstore-page-builder:dom:2",
			kind: "dom",
			selector: "section[class*='g-stage']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
