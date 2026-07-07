import type { TechnologyDefinition } from '../../types';

export const hibuTechnologyDefinition = {
	id: "hibu",
	name: "Hibu",
	website: "https://hibu.com",
	description: "Hibu is an AI-enabled platform that helps generate, manage, respond to, and convert leads while supporting ongoing customer engagement through a single provider.",
	icon: "Hibu.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "hibu:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.hibuwebsites\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "hibu:jsGlobal:1",
			kind: "jsGlobal",
			property: "hibuWebsiteConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
