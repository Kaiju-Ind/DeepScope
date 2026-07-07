import type { TechnologyDefinition } from '../../types';

export const vimeoOttTechnologyDefinition = {
	id: "vimeo-ott",
	name: "Vimeo OTT",
	website: "https://vimeo.com/ott",
	description: "Vimeo OTT allows brands and creators to launch their own white-label video subscription channels, where subscribers can access video content for free, as a rental, or for purchase.",
	icon: "Vimeo.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "vimeo-ott:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.vhx\\.tv"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "vimeo-ott:jsGlobal:1",
			kind: "jsGlobal",
			property: "VHX.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vimeo-ott:jsGlobal:2",
			kind: "jsGlobal",
			property: "_vhx",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"vimeo",
	],
} as const satisfies TechnologyDefinition;
