import type { TechnologyDefinition } from '../../types';

export const destinetTechnologyDefinition = {
	id: "destinet",
	name: "Destinet",
	website: "https://www.destinet.no",
	description: "Destinet is a homepage generator system designed to streamline the creation of customizable web pages.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "destinet:jsGlobal:0",
			kind: "jsGlobal",
			property: "DestinetMap.SetMap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "destinet:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("Destinet", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "destinet:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("destinet", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
