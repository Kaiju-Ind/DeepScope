import type { TechnologyDefinition } from '../../types';

export const datacrushTechnologyDefinition = {
	id: "datacrush",
	name: "Datacrush",
	website: "https://www.datacrush.la",
	description: "Datacrush is a marketing automation platform.",
	icon: "Datacrush.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "datacrush:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("js\\.datacrush\\.la"),
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
