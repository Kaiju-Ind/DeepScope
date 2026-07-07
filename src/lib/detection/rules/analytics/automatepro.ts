import type { TechnologyDefinition } from '../../types';

export const automateproTechnologyDefinition = {
	id: "automatepro",
	name: "AutomatePro",
	website: "https://automatepro.ai",
	description: "AutomatePro is a workflow automation platform that streamlines routine business processes.",
	icon: "AutomatePro.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "automatepro:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.automatepro\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
