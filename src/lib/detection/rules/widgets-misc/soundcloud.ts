import type { TechnologyDefinition } from '../../types';

export const soundcloudTechnologyDefinition = {
	id: "soundcloud",
	name: "SoundCloud",
	website: "https://developers.soundcloud.com/docs/api/html5-widget",
	description: "SoundCloud widget gives you the ability to upload, manage and share tracks.",
	icon: "SoundCloud.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "soundcloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sndcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "soundcloud:dom:1",
			kind: "dom",
			selector: "iframe[src*='.soundcloud.com/'], img[src*='.sndcdn.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "soundcloud:jsGlobal:2",
			kind: "jsGlobal",
			property: "SC.Widget.Events.PLAY",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
