import type { TechnologyDefinition } from '../../types';

export const kalturaTechnologyDefinition = {
	id: "kaltura",
	name: "Kaltura",
	website: "https://corp.kaltura.com",
	description: "Kaltura is a video content management platform that allows users to upload, manage, share, publish, and stream videos.",
	icon: "Kaltura.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "kaltura:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.kaltura\\.(?:nordu\\.net|com)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kaltura:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("kalturaPlayer"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kaltura:dom:2",
			kind: "dom",
			selector: "link[href*='.kaltura.com'], div.kaltura-zone",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kaltura:jsGlobal:3",
			kind: "jsGlobal",
			property: "Kplayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kaltura:jsGlobal:4",
			kind: "jsGlobal",
			property: "kGetKalturaEmbedSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kaltura:jsGlobal:5",
			kind: "jsGlobal",
			property: "kGetKalturaPlayerList",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kaltura:jsGlobal:6",
			kind: "jsGlobal",
			property: "kalturaIframeEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kaltura:jsGlobal:7",
			kind: "jsGlobal",
			property: "restoreKalturaKDPCallback",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kaltura:scriptContent:8",
			kind: "scriptContent",
			pattern: new RegExp("kalturaplayer"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
