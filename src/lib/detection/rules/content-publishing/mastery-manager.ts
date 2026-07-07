import type { TechnologyDefinition } from '../../types';

export const masteryManagerTechnologyDefinition = {
	id: "mastery-manager",
	name: "Mastery Manager",
	website: "https://masterymanager.com",
	description: "Mastery Manager is a student learning system designed to track academic progress, evaluate performance, and support data-driven instructional planning.",
	icon: "MasteryManager.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "mastery-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.masterymanager\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
