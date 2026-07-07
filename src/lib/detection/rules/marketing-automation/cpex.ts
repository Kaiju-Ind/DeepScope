import type { TechnologyDefinition } from '../../types';

export const cpexTechnologyDefinition = {
	id: "cpex",
	name: "CPEx",
	website: "https://www.cpex.cz",
	description: "CPEx is a publisher exchange system facilitating content distribution and collaboration among publishers.",
	icon: "CPEx.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cpex:jsGlobal:0",
			kind: "jsGlobal",
			property: "cpexAddCMPCloseButton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cpex:jsGlobal:1",
			kind: "jsGlobal",
			property: "cpexCmpVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
