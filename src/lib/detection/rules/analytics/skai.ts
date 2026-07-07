import type { TechnologyDefinition } from '../../types';

export const skaiTechnologyDefinition = {
	id: "skai",
	name: "Skai",
	website: "https://skai.io",
	description: "Skai (formerly Kenshoo) is a marketing activation solution for brands and agencies.",
	icon: "Skai.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "skai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.xg4ken\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "skai:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ktag_Constants",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
