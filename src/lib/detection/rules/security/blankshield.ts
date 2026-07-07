import type { TechnologyDefinition } from '../../types';

export const blankshieldTechnologyDefinition = {
	id: "blankshield",
	name: "Blankshield",
	website: "https://danielstjules.github.io/blankshield",
	description: "Blankshield is a security tool that prevents reverse tabnabbing phishing attacks by blocking exploitation of links that open in new browser tabs using _blank targets.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "blankshield:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/blankshield\\/blankshield\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blankshield:jsGlobal:1",
			kind: "jsGlobal",
			property: "blankshield.open",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
