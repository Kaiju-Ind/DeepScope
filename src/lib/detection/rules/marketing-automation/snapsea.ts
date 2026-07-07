import type { TechnologyDefinition } from '../../types';

export const snapseaTechnologyDefinition = {
	id: "snapsea",
	name: "SnapSea",
	website: "https://www.snapsea.io",
	description: "SnapSea is a platform that displays destinations using user-generated content to highlight real-world experiences and local visuals.",
	icon: "SnapSea.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "snapsea:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.snapsea\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "snapsea:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.snapsea.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
