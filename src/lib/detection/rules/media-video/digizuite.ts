import type { TechnologyDefinition } from '../../types';

export const digizuiteTechnologyDefinition = {
	id: "digizuite",
	name: "Digizuite",
	website: "https://www.digizuite.com",
	description: "Digizuite is a Digital Asset Management software for enterprises.",
	icon: "Digizuite.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "digizuite:dom:0",
			kind: "dom",
			selector: "img[src^='/globalassets/digizuite/'], source[srcset^='/globalassets/digizuite/'], video[src^='/globalassets/digizuite/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "digizuite:dom:1",
			kind: "dom",
			selector: "img[src^='/globalassets/digizuite/']",
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
