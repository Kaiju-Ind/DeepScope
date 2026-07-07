import type { TechnologyDefinition } from '../../types';

export const rocketToolsTechnologyDefinition = {
	id: "rocket-tools",
	name: "Rocket Tools",
	website: "https://www.rocket-tools.io",
	description: "Rocket Tools is an AI platform that connects brands with customers, transforming mall data into actionable insights for marketing performance.",
	icon: "RocketTools.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rocket-tools:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("script\\.rocket-tools\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
