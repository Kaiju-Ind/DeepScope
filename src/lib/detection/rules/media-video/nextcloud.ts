import type { TechnologyDefinition } from '../../types';

export const nextcloudTechnologyDefinition = {
	id: "nextcloud",
	name: "Nextcloud",
	website: "https://nextcloud.com",
	description: "Nextcloud is a suite of client-server software for creating and using file hosting services.",
	icon: "Nextcloud.svg",
	categories: [
		"media-video",
		"widgets-misc",
	],
	rules: [
		{
			id: "nextcloud:jsGlobal:0",
			kind: "jsGlobal",
			property: "oc_config.version",
			valuePattern: new RegExp("^([\\.\\d]+)$"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nextcloud:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^__Host\\-nc_sameSiteCookielax$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nextcloud:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^__Host\\-nc_sameSiteCookiestrict$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nextcloud:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^__host\\-nc_samesitecookielax$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nextcloud:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^__host\\-nc_samesitecookiestrict$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"payg",
			"recurring",
		],
		cpe: "cpe:2.3:a:nextcloud:nextcloud:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
