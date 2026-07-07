import type { TechnologyDefinition } from '../../types';

export const nextuiTechnologyDefinition = {
	id: "nextui",
	name: "NextUI",
	website: "https://nextui.org/",
	description: "NextUI allows you to make beautiful, modern, and fast websites/applications regardless of your design experience, created with React.js and Stitches, based on React Aria and inspired by Vuesax.",
	icon: "NextUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "nextui:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("--nextui-(?:colors-accents1|colors-text|space-0|fonts-sans|fonts-mono)"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "nextui:dom:1",
			kind: "dom",
			selector: "link[href*='nextui.org'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nextui:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\@nextui-org\\/"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nextui:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("nextui"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "nextui:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("nextui"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "nextui:html:modern:3",
			kind: "html",
			pattern: new RegExp("data-nextui"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "nextui:html:modern:4",
			kind: "html",
			pattern: new RegExp("class=\"nextui-"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"react",
		"stitches",
	],
} as const satisfies TechnologyDefinition;
