import type { TechnologyDefinition } from '../../types';

export const pluglinTechnologyDefinition = {
	id: "pluglin",
	name: "Pluglin",
	website: "https://www.pluglin.com",
	description: "Pluglin is a platform that provides website translation services to support multilingual content.",
	icon: "Pluglin.svg",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "pluglin:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.pluglin\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
