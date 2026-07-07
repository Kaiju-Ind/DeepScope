import type { TechnologyDefinition } from '../../types';

export const inplayerTechnologyDefinition = {
	id: "inplayer",
	name: "Inplayer",
	website: "https://inplayer.com",
	description: "Inplayer is a platform that enables video streaming at scale, supports audience expansion across devices, and provides tools for content monetization.",
	icon: "Inplayer.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "inplayer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.inplayer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
