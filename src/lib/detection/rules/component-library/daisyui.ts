import type { TechnologyDefinition } from '../../types';

export const daisyuiTechnologyDefinition = {
	id: "daisyui",
	name: "daisyUI",
	website: "https://daisyui.com",
	description: "daisyUI is a customisable Tailwind CSS component library that prevents verbose markup in frontend applications. With a focus on customising and creating themes for user interfaces, daisyUI uses pure CSS and Tailwind utility classes, allowing developers to write clean HTML.",
	icon: "daisyUI.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "daisyui:dom:0",
			kind: "dom",
			selector: "link[href*='npm/daisyui']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "daisyui:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("daisyUI"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "daisyui:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("daisyui"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "daisyui:stylesheetContent:modern:1",
			kind: "stylesheetContent",
			pattern: new RegExp("daisyui"),
			confidence: 75,
			description: "Stylesheet content matches a modern styling marker.",
		},
		{
			id: "daisyui:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("daisyui"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "daisyui:html:modern:3",
			kind: "html",
			pattern: new RegExp("class=\"[^\"]*\\bbtn\\b[^\"]*\".*class=\"[^\"]*\\bcard\\b"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "daisyui:html:modern:4",
			kind: "html",
			pattern: new RegExp("class=\"[^\"]*\\bdaisy-"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "daisyui:html:modern:5",
			kind: "html",
			pattern: new RegExp("class=\"[^\"]*\\bdrawer\\b"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
