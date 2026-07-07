import type { TechnologyDefinition } from '../../types';

export const markoTechnologyDefinition = {
	id: "marko",
	name: "Marko",
	website: "https://markojs.com",
	description: "Marko is HTML re-imagined as a language for building dynamic and reactive user interfaces.",
	icon: "Marko.svg",
	categories: [
		"framework",
		"component-library",
	],
	rules: [
		{
			id: "marko:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.marko(\\.js)?"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "marko:dom:1",
			kind: "dom",
			selector: "#data-marko-key, html[data-framework='marko']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "marko:jsGlobal:2",
			kind: "jsGlobal",
			property: "markoComponent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "marko:jsGlobal:3",
			kind: "jsGlobal",
			property: "markoSections",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "marko:jsGlobal:4",
			kind: "jsGlobal",
			property: "markoVars",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "marko:dom:5",
			kind: "dom",
			selector: "#data-marko-key, [data-marko-key], html[data-framework='marko']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
