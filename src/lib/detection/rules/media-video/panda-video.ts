import type { TechnologyDefinition } from '../../types';

export const pandaVideoTechnologyDefinition = {
	id: "panda-video",
	name: "Panda Video",
	website: "https://pandavideo.com",
	description: "Panda Video is a video hosting platform that provide streaming, engages viewers, and supports sales growth.",
	icon: "PandaVideo.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "panda-video:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.tv\\.pandavideo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "panda-video:dom:1",
			kind: "dom",
			selector: "iframe[src*='tv.pandavideo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "panda-video:jsGlobal:2",
			kind: "jsGlobal",
			property: "pandaLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "panda-video:jsGlobal:3",
			kind: "jsGlobal",
			property: "pandatag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
