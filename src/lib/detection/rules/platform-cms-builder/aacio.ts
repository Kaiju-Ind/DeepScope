import type { TechnologyDefinition } from '../../types';

export const aacioTechnologyDefinition = {
	id: "aacio",
	name: "Aacio",
	website: "https://aacio.io",
	description: "Aacio is an all-in-one platform that integrates multiple applications to offer tools, support, and resources aimed at facilitating business operations and growth.",
	icon: "Aacio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aacio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.aacio\\.io"),
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
