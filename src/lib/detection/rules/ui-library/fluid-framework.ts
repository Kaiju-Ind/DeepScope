import type { TechnologyDefinition } from '../../types';

export const fluidFrameworkTechnologyDefinition = {
	id: "fluid-framework",
	name: "Fluid Framework",
	website: "https://fluidframework.com",
	description: "Fluid Framework is a high-performance technology stack that supports real-time, collaborative innovation across applications.",
	icon: "FluidFramework.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "fluid-framework:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunk_fluidx_loop_app",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
