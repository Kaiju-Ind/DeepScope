import type { TechnologyDefinition } from '../../types';

export const keepArcheevoTechnologyDefinition = {
	id: "keep-archeevo",
	name: "keep. archeevo",
	website: "https://www.keep.pt/en/produts/archeevo-archival-management-software",
	description: "keep. archeevo is an archival management software that aims to support all the functional areas of an archival institution, covering activities ranging from archival description to employee performance assessment.",
	icon: "keep. archeevo.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "keep-archeevo:jsGlobal:0",
			kind: "jsGlobal",
			property: "ArcheevoSnippets.mostviewedDocumentsURL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "keep-archeevo:jsGlobal:1",
			kind: "jsGlobal",
			property: "embedArcheevoBasicSearch",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
