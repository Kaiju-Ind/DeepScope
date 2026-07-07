import type { TechnologyDefinition } from '../../types';

export const lozadJsTechnologyDefinition = {
	id: "lozad-js",
	name: "Lozad.js",
	website: "https://apoorv.pro/lozad.js/",
	description: "Lozad.js is a lightweight lazy-loading library that's just 535 bytes minified & gzipped.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "lozad-js:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/lozad\\.min\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "lozad-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "lozad",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
