import type { TechnologyDefinition } from '../../types';

export const curaytorTechnologyDefinition = {
	id: "curaytor",
	name: "Curaytor",
	website: "https://www.curaytor.com",
	description: "Curaytor is a digital marketing platform that provides online strategy, advertising, and lead generation solutions for businesses seeking to enhance their digital presence.",
	icon: "Curaytor.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "curaytor:dom:0",
			kind: "dom",
			selector: "link[href*='.curaytor.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "curaytor:header:1",
			kind: "header",
			key: "X-Served-By",
			valuePattern: new RegExp("\\.curaytor\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "curaytor:header:2",
			kind: "header",
			key: "x-served-by",
			valuePattern: new RegExp("\\.curaytor\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
