import type { TechnologyDefinition } from '../../types';

export const sublimevideoTechnologyDefinition = {
	id: "sublimevideo",
	name: "SublimeVideo",
	website: "https://sublimevideo.net",
	description: "SublimeVideo is a framework for HTML5 Video Player.",
	icon: "SublimeVideo.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "sublimevideo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.sublimevideo\\.net\\/js\\/[a-z\\d]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sublimevideo:jsGlobal:1",
			kind: "jsGlobal",
			property: "sublimevideo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
