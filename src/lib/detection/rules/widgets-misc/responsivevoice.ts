import type { TechnologyDefinition } from '../../types';

export const responsivevoiceTechnologyDefinition = {
	id: "responsivevoice",
	name: "ResponsiveVoice",
	website: "https://responsivevoice.org",
	description: "ResponsiveVoice is a Text-To-Speech API supported in 51 languages.",
	icon: "ResponsiveVoice.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "responsivevoice:jsGlobal:0",
			kind: "jsGlobal",
			property: "responsiveVoice.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
