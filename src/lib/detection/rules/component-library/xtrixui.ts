import type { TechnologyDefinition } from '../../types';

export const xtrixuiTechnologyDefinition = {
	id: "xtrixui",
	name: "XtrixUI",
	website: "https://xtrixui.vercel.app",
	description: "XtrixUI is a CrossFramework UI library designed for building WebApps, regardless of design experience.",
	icon: "XtrixUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "xtrixui:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("XtrixUI"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "xtrixui:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("xtrixui"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
