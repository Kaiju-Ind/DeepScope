import type { TechnologyDefinition } from '../../types';

export const masterking32FrameworkTechnologyDefinition = {
	id: "masterking32-framework",
	name: "MasterkinG32 Framework",
	website: "https://masterking32.com",
	description: "MasterkinG32 framework.",
	icon: "Masterking32.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "masterking32-framework:header:0",
			kind: "header",
			key: "X-Powered-Framework",
			valuePattern: new RegExp("MasterkinG(?:)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "masterking32-framework:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^MasterkinG(?:)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "masterking32-framework:header:2",
			kind: "header",
			key: "x-powered-framework",
			valuePattern: new RegExp("masterking(?:)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "masterking32-framework:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^masterking(?:)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
