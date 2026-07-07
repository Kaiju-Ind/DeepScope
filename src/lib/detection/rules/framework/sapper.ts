import type { TechnologyDefinition } from '../../types';

export const sapperTechnologyDefinition = {
	id: "sapper",
	name: "Sapper",
	website: "https://sapper.svelte.dev",
	icon: "Sapper.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "sapper:html:0",
			kind: "html",
			pattern: new RegExp("<script[^>]*>__SAPPER__"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sapper:jsGlobal:1",
			kind: "jsGlobal",
			property: "__SAPPER__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sapper:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("__SAPPER__"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sapper:html:3",
			kind: "html",
			pattern: new RegExp("<script[^>]*>__sapper__"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"node-js",
		"svelte",
	],
} as const satisfies TechnologyDefinition;
