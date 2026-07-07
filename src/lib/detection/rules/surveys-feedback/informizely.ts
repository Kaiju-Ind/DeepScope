import type { TechnologyDefinition } from '../../types';

export const informizelyTechnologyDefinition = {
	id: "informizely",
	name: "Informizely",
	website: "https://www.informizely.com",
	description: "Informizely is a customer feedback platform used to run surveys on websites and applications to understand user behavior and generate actionable insights.",
	icon: "Informizely.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "informizely:dom:0",
			kind: "dom",
			selector: "script[id*='_informizely_script_tag']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
