import type { TechnologyDefinition } from '../../types';

export const weasyTechnologyDefinition = {
	id: "weasy",
	name: "Weasy",
	website: "https://weasy.io",
	description: "Weasy is an AI-based platform that automatically generates websites and online stores from minimal input.",
	icon: "Weasy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "weasy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.weasy\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "weasy:jsGlobal:1",
			kind: "jsGlobal",
			property: "weasyPixel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "weasy:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Weasy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
