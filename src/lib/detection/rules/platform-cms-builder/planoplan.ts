import type { TechnologyDefinition } from '../../types';

export const planoplanTechnologyDefinition = {
	id: "planoplan",
	name: "Planoplan",
	website: "https://planoplan.com",
	description: "Planoplan is a 3D interior design program that offers layouts, visualizations, and virtual tours for creating and exploring interior spaces.",
	icon: "Planoplan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "planoplan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.planoplan\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "planoplan:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.planoplan\\.com"),
			description: "Script content contains a bounded technology signature.",
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
