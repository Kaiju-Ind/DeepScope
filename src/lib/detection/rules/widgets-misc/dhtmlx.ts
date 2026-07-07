import type { TechnologyDefinition } from '../../types';

export const dhtmlxTechnologyDefinition = {
	id: "dhtmlx",
	name: "DHTMLX",
	website: "https://dhtmlx.com",
	description: "DHTMLX specialises in building JavaScript UI libraries for project management, event planning, big data visualisation, and reporting.",
	icon: "DHTMLX.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dhtmlx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/dhtmlxcommon\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dhtmlx:jsGlobal:1",
			kind: "jsGlobal",
			property: "dhtmlDragAndDropObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dhtmlx:jsGlobal:2",
			kind: "jsGlobal",
			property: "dhtmlXTreeItemObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
