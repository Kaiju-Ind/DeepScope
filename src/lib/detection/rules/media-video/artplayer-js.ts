import type { TechnologyDefinition } from '../../types';

export const artplayerJsTechnologyDefinition = {
	id: "artplayer-js",
	name: "Artplayer.js",
	website: "https://artplayer.org",
	description: "Artplayer.js is an HTML5 video player that supports customizable UI, subtitles, and plugins, offering a flexible and modern video playback solution.",
	icon: "Artplayer.js.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "artplayer-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "Artplayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
