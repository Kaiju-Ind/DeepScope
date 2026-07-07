import type { TechnologyDefinition } from '../../types';

export const formatTechnologyDefinition = {
	id: "format",
	name: "Format",
	website: "https://www.format.com",
	description: "Format is a portfolio CMS system designed for creating, managing, and showcasing digital portfolios.",
	icon: "Format.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "format:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("format\\.com"),
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
