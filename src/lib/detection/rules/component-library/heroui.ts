import type { TechnologyDefinition } from '../../types';

export const herouiTechnologyDefinition = {
	id: "heroui",
	name: "HeroUI",
	website: "https://nextui.org/",
	description: "HeroUI allows you to make beautiful, modern, and fast websites/applications regardless of your design experience, created with React.js and Stitches, based on React Aria and inspired by Vuesax.",
	icon: "HeroUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "heroui:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("NextUI"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "heroui:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("--nextui-(?:colors-accents1|colors-text|space-0|fonts-sans|fonts-mono)"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "heroui:dom:2",
			kind: "dom",
			selector: "link[href*='nextui.org'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "heroui:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("nextui"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
