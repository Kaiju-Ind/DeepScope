import type { TechnologyDefinition } from '../../types';

export const allstateTechnologyDefinition = {
	id: "allstate",
	name: "Allstate",
	website: "https://www.allstate.com",
	description: "Allstate is a provider of auto insurance quote metrics, offering data-driven insights to assess coverage options, pricing, and risk factors.",
	icon: "Allstate.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "allstate:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("agents\\.allstate\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "allstate:jsGlobal:1",
			kind: "jsGlobal",
			property: "s_i_allstateglobal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
