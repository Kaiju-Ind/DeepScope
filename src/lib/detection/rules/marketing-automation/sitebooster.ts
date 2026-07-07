import type { TechnologyDefinition } from '../../types';

export const siteboosterTechnologyDefinition = {
	id: "sitebooster",
	name: "SiteBooster",
	website: "https://sitebooster.com",
	description: "Site Booster is a tool that publishes business details across major online directories and platforms to enhance visibility.",
	icon: "SiteBooster.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sitebooster:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/sitebooster\\.com"),
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
