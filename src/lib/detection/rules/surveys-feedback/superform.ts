import type { TechnologyDefinition } from '../../types';

export const superformTechnologyDefinition = {
	id: "superform",
	name: "Superform",
	website: "https://superformjs.webflow.io/",
	description: "Superform is a next-gen form engine developed for Webflow's no-code community, enabling form creation and management without requiring coding knowledge.",
	icon: "Superform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "superform:jsGlobal:0",
			kind: "jsGlobal",
			property: "Superform",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "superform:jsGlobal:1",
			kind: "jsGlobal",
			property: "SuperformAPI.version",
			valuePattern: new RegExp("^v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
