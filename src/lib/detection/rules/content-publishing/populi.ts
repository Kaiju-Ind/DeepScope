import type { TechnologyDefinition } from '../../types';

export const populiTechnologyDefinition = {
	id: "populi",
	name: "Populi",
	website: "https://populi.co",
	description: "Populi is a platform that helps colleges manage academic and administrative operations while supporting a streamlined educational experience for students.",
	icon: "Populi.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "populi:dom:0",
			kind: "dom",
			selector: "iframe[src*='.populiweb.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "populi:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Populi$", "i"),
			description: "Meta tag matches a known technology marker.",
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
