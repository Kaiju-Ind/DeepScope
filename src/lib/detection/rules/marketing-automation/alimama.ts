import type { TechnologyDefinition } from '../../types';

export const alimamaTechnologyDefinition = {
	id: "alimama",
	name: "Alimama",
	website: "https://www.alimama.com",
	description: "Alimama is a data-driven marketing technology platform that enables businesses to optimize campaigns and audience engagement through advanced analytics.",
	icon: "Alimama.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "alimama:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.alimama\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alimama:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.alimama\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
