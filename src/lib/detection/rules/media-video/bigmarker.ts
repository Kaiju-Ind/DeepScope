import type { TechnologyDefinition } from '../../types';

export const bigmarkerTechnologyDefinition = {
	id: "bigmarker",
	name: "BigMarker",
	website: "https://www.bigmarker.com",
	description: "BigMarker is a platform for hosting webinars, virtual, and hybrid events, providing tools for presentations, audience engagement, and event management in one solution.",
	icon: "BigMarker.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "bigmarker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bigmarker\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bigmarker:dom:1",
			kind: "dom",
			selector: "input[value*='.bigmarker.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
