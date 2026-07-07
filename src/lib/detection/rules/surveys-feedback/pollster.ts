import type { TechnologyDefinition } from '../../types';

export const pollsterTechnologyDefinition = {
	id: "pollster",
	name: "Pollster",
	website: "https://pollster.pl",
	description: "Pollster is a feedback and research system based in Poland that collects and analyses survey data.",
	icon: "Pollster.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "pollster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pollster\\.pl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pollster:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.pollster\\.pl"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
