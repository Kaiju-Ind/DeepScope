import type { TechnologyDefinition } from '../../types';

export const alloyuiTechnologyDefinition = {
	id: "alloyui",
	name: "AlloyUI",
	website: "https://www.alloyui.com",
	icon: "AlloyUI.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "alloyui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/cdn\\.alloyui\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alloyui:jsGlobal:1",
			kind: "jsGlobal",
			property: "AUI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"bootstrap",
		"yui",
	],
} as const satisfies TechnologyDefinition;
