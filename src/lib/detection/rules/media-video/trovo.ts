import type { TechnologyDefinition } from '../../types';

export const trovoTechnologyDefinition = {
	id: "trovo",
	name: "Trovo",
	website: "https://trovo.live",
	description: "Trovo is a platform for live streaming and connecting with others through gaming, music, and other interactive content.",
	icon: "Trovo.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "trovo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.trovo-tag\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
