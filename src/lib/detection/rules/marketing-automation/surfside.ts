import type { TechnologyDefinition } from '../../types';

export const surfsideTechnologyDefinition = {
	id: "surfside",
	name: "Surfside",
	website: "https://surfside.io",
	description: "Surfside is an end-to-end marketing technology that aggregates first-party data across customer touchpoints, enabling advertisers to analyze, target, and measure strategies for influencing current and future customers.",
	icon: "Surfside.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "surfside:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.surfside\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "surfside:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.surfside\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
