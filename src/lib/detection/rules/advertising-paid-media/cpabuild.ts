import type { TechnologyDefinition } from '../../types';

export const cpabuildTechnologyDefinition = {
	id: "cpabuild",
	name: "CPABuild",
	website: "https://cpabuild.com",
	description: "CPABuild is a next generation CPA network with integrated template building and sharing functionality.",
	icon: "CPABuild.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "cpabuild:jsGlobal:0",
			kind: "jsGlobal",
			property: "CPABuildLock",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
