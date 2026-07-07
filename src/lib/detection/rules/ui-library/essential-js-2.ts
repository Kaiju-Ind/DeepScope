import type { TechnologyDefinition } from '../../types';

export const essentialJs2TechnologyDefinition = {
	id: "essential-js-2",
	name: "Essential JS 2",
	website: "https://www.syncfusion.com/javascript-ui-controls",
	description: "Essential JS 2 is Syncfusion's JavaScript UI component suite for web applications.",
	icon: "syncfusion.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "essential-js-2:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+ class ?= ?\"(?:e-control|[^\"]+ e-control)(?: )[^\"]* e-lib\\b"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "essential-js-2:dom:1",
			kind: "dom",
			selector: "[class*='e-control'][class~='e-lib']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
