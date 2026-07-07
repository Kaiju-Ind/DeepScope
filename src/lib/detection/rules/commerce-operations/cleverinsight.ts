import type { TechnologyDefinition } from '../../types';

export const cleverinsightTechnologyDefinition = {
	id: "cleverinsight",
	name: "CleverInsight",
	website: "https://clever-insight.com",
	description: "CleverInsight is a tool that helps businesses measure customer satisfaction and design loyalty programs to improve customer retention.",
	icon: "CleverInsight.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cleverinsight:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.clevernps.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
