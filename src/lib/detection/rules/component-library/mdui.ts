import type { TechnologyDefinition } from '../../types';

export const mduiTechnologyDefinition = {
	id: "mdui",
	name: "MDUI",
	website: "https://www.mdui.org",
	description: "MDUI is a CSS Framework based on material design.",
	icon: "MDUI.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "mdui:jsGlobal:0",
			kind: "jsGlobal",
			property: "_mduiEventId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mdui:jsGlobal:1",
			kind: "jsGlobal",
			property: "mdui.Drawer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mdui:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("www\\.mdui\\.org"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
