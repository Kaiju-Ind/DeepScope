import type { TechnologyDefinition } from '../../types';

export const sendlaneTechnologyDefinition = {
	id: "sendlane",
	name: "Sendlane",
	website: "https://www.sendlane.com/",
	description: "Sendlane is an email and sms marketing platform for online businesses",
	icon: "Sendland.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sendlane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sendlane\\.com\\/scripts\\/pusher\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sendlane:jsGlobal:1",
			kind: "jsGlobal",
			property: "_Sendlane",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
