import type { TechnologyDefinition } from '../../types';

export const b12TechnologyDefinition = {
	id: "b12",
	name: "B12",
	website: "https://www.b12.io",
	description: "B12 is an AI-powered website builder that automatically generates and customizes websites using machine learning to streamline design, content creation, and deployment.",
	icon: "B12.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "b12:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.b12\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "b12:jsGlobal:1",
			kind: "jsGlobal",
			property: "b12.banner",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
