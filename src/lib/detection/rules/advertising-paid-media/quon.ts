import type { TechnologyDefinition } from '../../types';

export const quonTechnologyDefinition = {
	id: "quon",
	name: "Quon",
	website: "https://www.quon.ru",
	description: "Quon is a platform that provides control over website advertising and sales, integrating an end-to-end analytics system to optimize advertising management.",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "quon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("counter\\.quon\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
