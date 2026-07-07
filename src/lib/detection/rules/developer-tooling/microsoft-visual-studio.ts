import type { TechnologyDefinition } from '../../types';

export const microsoftVisualStudioTechnologyDefinition = {
	id: "microsoft-visual-studio",
	name: "Microsoft Visual Studio",
	website: "https://visualstudio.microsoft.com",
	description: "Microsoft Visual Studio is an integrated development environment from Microsoft.",
	icon: "Microsoft Visual Studio.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "microsoft-visual-studio:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Microsoft\\sVisual\\sStudio", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-visual-studio:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^microsoft\\svisual\\sstudio", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
