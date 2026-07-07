import type { TechnologyDefinition } from '../../types';

export const webpushrTechnologyDefinition = {
	id: "webpushr",
	name: "Webpushr",
	website: "https://www.webpushr.com",
	description: "Webpushr is a web push notification platform that supports mobile and desktop devices.",
	icon: "webpushr.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "webpushr:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.webpushr\\.com\\/app\\.min\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "webpushr:jsGlobal:1",
			kind: "jsGlobal",
			property: "WebPushr.notificationCard",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webpushr:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpushr_display_button",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
