import type { TechnologyDefinition } from '../../types';

export const stebbyTechnologyDefinition = {
	id: "stebby",
	name: "Stebby",
	website: "https://stebby.eu",
	description: "Stebby is a platform providing access to a wide range of health and wellness services across the Baltic region, supporting individuals and organizations in managing well-being offerings.",
	icon: "Stebby.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stebby:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.stebby\\.eu"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "stebby:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("app\\.stebby\\.eu", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
