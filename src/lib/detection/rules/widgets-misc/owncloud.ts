import type { TechnologyDefinition } from '../../types';

export const owncloudTechnologyDefinition = {
	id: "owncloud",
	name: "ownCloud",
	website: "https://owncloud.org",
	icon: "ownCloud.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "owncloud:html:0",
			kind: "html",
			pattern: new RegExp("<a href=\"https:\\/\\/owncloud\\.com\" target=\"_blank\">ownCloud Inc\\.<\\/a><br\\/>Your Cloud, Your Data, Your Way!"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "owncloud:meta:1",
			kind: "meta",
			key: "apple-itunes-app",
			valuePattern: new RegExp("app-id=543672169", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "owncloud:jsGlobal:2",
			kind: "jsGlobal",
			property: "oc_defaults",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "owncloud:html:3",
			kind: "html",
			pattern: new RegExp("<a href=\"https:\\/\\/owncloud\\.com\" target=\"_blank\">owncloud inc\\.<\\/a><br\\/>your cloud, your data, your way!"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:owncloud:owncloud:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
