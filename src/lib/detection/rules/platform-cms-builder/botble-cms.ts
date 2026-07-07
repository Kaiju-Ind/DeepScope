import type { TechnologyDefinition } from '../../types';

export const botbleCmsTechnologyDefinition = {
	id: "botble-cms",
	name: "Botble CMS",
	website: "https://botble.com",
	description: "Botble CMS is an open-source content management system built on Laravel.",
	icon: "Botble-CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "botble-cms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^botble_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "botble-cms:header:1",
			kind: "header",
			key: "CMS-Version",
			valuePattern: new RegExp("^(.+)$", "i"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "botble-cms:header:2",
			kind: "header",
			key: "cms-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
