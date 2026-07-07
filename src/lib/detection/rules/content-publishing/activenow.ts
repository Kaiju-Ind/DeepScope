import type { TechnologyDefinition } from '../../types';

export const activenowTechnologyDefinition = {
	id: "activenow",
	name: "ActiveNow",
	website: "https://activenow.io",
	description: "ActiveNow is a platform for managing school extracurricular activities, including program organization, participation tracking, scheduling, and administrative coordination.",
	icon: "ActiveNow.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "activenow:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.activenow\\.pl"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "activenow:jsGlobal:1",
			kind: "jsGlobal",
			property: "activeNowFormSelector",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "activenow:jsGlobal:2",
			kind: "jsGlobal",
			property: "activeNowOrigin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "activenow:jsGlobal:3",
			kind: "jsGlobal",
			property: "activenow",
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
