import type { TechnologyDefinition } from '../../types';

export const socialPinpointTechnologyDefinition = {
	id: "social-pinpoint",
	name: "Social Pinpoint",
	website: "https://www.socialpinpoint.com/",
	description: "Social Pinpoint is a comprehensive online platform that facilitates meaningful and accessible engagement opportunities that bring your community together.",
	icon: "socialpinpoint.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "social-pinpoint:dom:0",
			kind: "dom",
			selector: "a[href*='www.socialpinpoint.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
