import type { TechnologyDefinition } from '../../types';

export const connectifTechnologyDefinition = {
	id: "connectif",
	name: "Connectif",
	website: "https://connectif.ai",
	description: "Connectif is a marketing automation and personalisation data-first action platform, powered by AI.",
	icon: "Connectif.svg",
	categories: [
		"experimentation-optimization",
		"marketing-automation",
	],
	rules: [
		{
			id: "connectif:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.connectif\\.cloud\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "connectif:jsGlobal:1",
			kind: "jsGlobal",
			property: "connectif.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "connectif:jsGlobal:2",
			kind: "jsGlobal",
			property: "connectifInfo.store",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
