import type { TechnologyDefinition } from '../../types';

export const automatedGrowthTechnologyDefinition = {
	id: "automated-growth",
	name: "Automated Growth",
	website: "https://automatedgrowthagency.com",
	description: "Automated Growth is a platform offering AI and automation tools designed to streamline business operations.",
	icon: "AutomatedGrowth.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "automated-growth:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.automatedgrowthagency\\.com"),
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
