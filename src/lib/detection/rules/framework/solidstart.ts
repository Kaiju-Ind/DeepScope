import type { TechnologyDefinition } from '../../types';

export const solidstartTechnologyDefinition = {
	id: "solidstart",
	name: "SolidStart",
	website: "https://start.solidjs.com",
	description: "SolidStart is the Solid app framework.",
	icon: "SolidJS.svg",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "solidstart:jsGlobal:0",
			kind: "jsGlobal",
			property: "_$HY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solidstart:jsGlobal:1",
			kind: "jsGlobal",
			property: "_$HY.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"solidjs",
	],
} as const satisfies TechnologyDefinition;
