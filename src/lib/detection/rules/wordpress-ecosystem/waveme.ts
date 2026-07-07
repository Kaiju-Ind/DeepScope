import type { TechnologyDefinition } from '../../types';

export const wavemeTechnologyDefinition = {
	id: "waveme",
	name: "Waveme",
	website: "https://music.flatfull.com/waveme/about/",
	description: "Waveme is a WordPress theme that is suitable for individuals or businesses involved in the music industry, such as music producers, record labels, artist managers, or independent artists.",
	icon: "Waveme.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "waveme:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/waveme/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	implies: [
		"gutenberg",
		"waveform",
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
