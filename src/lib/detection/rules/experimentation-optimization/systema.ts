import type { TechnologyDefinition } from '../../types';

export const systemaTechnologyDefinition = {
	id: "systema",
	name: "Systema",
	website: "https://systema.ai",
	description: "Systema is an anonymous personalization platform designed for retailers to deliver tailored experiences without using personal identifiers.",
	icon: "Systema.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "systema:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.systema\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
