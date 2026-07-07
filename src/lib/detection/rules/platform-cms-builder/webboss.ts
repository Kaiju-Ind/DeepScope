import type { TechnologyDefinition } from '../../types';

export const webbossTechnologyDefinition = {
	id: "webboss",
	name: "WebBoss",
	website: "https://webboss.io",
	description: "WebBoss is a website builder designed for professional designers and developers, offering tools for creating and managing custom websites.",
	icon: "WebBoss.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webboss:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("WebBoss ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webboss:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("webboss ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
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
