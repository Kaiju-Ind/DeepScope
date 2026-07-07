import type { TechnologyDefinition } from '../../types';

export const glassboxTechnologyDefinition = {
	id: "glassbox",
	name: "Glassbox",
	website: "https://www.glassbox.com",
	description: "Glassbox is an Israeli software company. It sells session-replay analytics software and services.",
	icon: "Glassbox.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "glassbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.glassboxcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "glassbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "SessionCamRecorder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "glassbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "sessioncamConfiguration",
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
