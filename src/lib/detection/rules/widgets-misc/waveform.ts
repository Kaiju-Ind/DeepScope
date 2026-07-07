import type { TechnologyDefinition } from '../../types';

export const waveformTechnologyDefinition = {
	id: "waveform",
	name: "Waveform",
	website: "https://music.flatfull.com/waveme/about/",
	description: "Waveform is a media player that supports various media formats, including audio, video, Youtube, and Vimeo, and includes a waveform visualisation feature, utilising Web Audio API and HTML5 Canvas technologies.",
	icon: "Waveme.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "waveform:jsGlobal:0",
			kind: "jsGlobal",
			property: "Waveform",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
