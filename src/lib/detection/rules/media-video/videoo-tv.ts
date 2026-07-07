import type { TechnologyDefinition } from '../../types';

export const videooTvTechnologyDefinition = {
	id: "videoo-tv",
	name: "Videoo.tv",
	website: "https://videoo.tv",
	description: "Videoo.tv is a platform that enhances website performance and user experience through innovative video and display formats, offering advanced tools to maximize revenue generation.",
	icon: "VideooTv.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "videoo-tv:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.videoo\\.tv"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "videoo-tv:jsGlobal:1",
			kind: "jsGlobal",
			property: "videooTVCtrlLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "videoo-tv:jsGlobal:2",
			kind: "jsGlobal",
			property: "videootv",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
