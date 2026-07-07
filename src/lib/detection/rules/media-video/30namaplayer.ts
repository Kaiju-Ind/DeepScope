import type { TechnologyDefinition } from '../../types';

export const technology30namaplayerTechnologyDefinition = {
	id: "30namaplayer",
	name: "30namaPlayer",
	website: "https://30nama.com/",
	description: "30namaPlayer is a modified version of Video.js to work with videos on HTML using javascript.",
	icon: "30namaPlayer.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "30namaplayer:dom:0",
			kind: "dom",
			selector: "section[class*='player30nama']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
