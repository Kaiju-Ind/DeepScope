import type { TechnologyDefinition } from '../../types';

export const dableTechnologyDefinition = {
	id: "dable",
	name: "Dable",
	website: "https://dable.io",
	description: "Dable is a content discovery platform for the open web that uses AI to deliver engaging content through native advertising.",
	icon: "Dable.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "dable:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("static\\.dable\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "dable:jsGlobal:1",
			kind: "jsGlobal",
			property: "dable.q",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
