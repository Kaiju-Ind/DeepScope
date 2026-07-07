import type { TechnologyDefinition } from '../../types';

export const uniformDigitalExperienceTechnologyDefinition = {
	id: "uniform-digital-experience",
	name: "Uniform Digital Experience",
	website: "https://www.uniform.dev",
	description: "Uniform Digital Experience is a digital experience platform (DXP) designed to manage, deliver, and optimize content and interactions across multiple digital channels.",
	icon: "UniformDigitalExperience.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "uniform-digital-experience:jsGlobal:0",
			kind: "jsGlobal",
			property: "__UNIFORM_CONTEXTUAL_EDITING_CONTEXT__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uniform-digital-experience:jsGlobal:1",
			kind: "jsGlobal",
			property: "__UNIFORM_DEVTOOLS_CONTEXT_INSTANCE__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uniform-digital-experience:jsGlobal:2",
			kind: "jsGlobal",
			property: "isUniform",
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
