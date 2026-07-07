import type { TechnologyDefinition } from '../../types';

export const plusprocomponentsTechnologyDefinition = {
	id: "plusprocomponents",
	name: "PlusProComponents",
	website: "https://plus-pro-components.com",
	description: "PlusProComponents is a collection of page-level front-end components designed to streamline web development and enhance UI consistency.",
	icon: "PlusProComponents.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "plusprocomponents:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("plus-pro-components\\.js"),
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
