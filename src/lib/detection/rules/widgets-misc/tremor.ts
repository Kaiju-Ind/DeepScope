import type { TechnologyDefinition } from '../../types';

export const tremorTechnologyDefinition = {
	id: "tremor",
	name: "Tremor",
	website: "https://tremor.so",
	description: "Tremor is an open-source library for building charts and dashboards using React components, designed on top of Tailwind CSS.",
	icon: "Tremor.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tremor:dom:0",
			kind: "dom",
			selector: "div[tremor-id*='tremor-raw'], div[class*='text-tremor-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
