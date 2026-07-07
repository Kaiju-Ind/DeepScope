import type { TechnologyDefinition } from '../../types';

export const tagnologyTechnologyDefinition = {
	id: "tagnology",
	name: "Tagnology",
	website: "https://tagnology.co",
	description: "Tagnology is a platform that transforms authentic content and meaningful interactions into valuable brand assets.",
	icon: "Tagnology.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tagnology:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.tagnology\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tagnology:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.tagnology\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
