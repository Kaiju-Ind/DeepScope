import type { TechnologyDefinition } from '../../types';

export const autoHqTechnologyDefinition = {
	id: "auto-hq",
	name: "Auto HQ",
	website: "https://www.autohq.co.uk",
	description: "Auto HQ is a provider of custom car dealer websites and SEO services designed to enhance visibility and attract customers.",
	icon: "AutoHQ.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "auto-hq:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.autohq\\.co\\.uk"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
