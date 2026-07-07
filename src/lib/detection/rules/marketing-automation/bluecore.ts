import type { TechnologyDefinition } from '../../types';

export const bluecoreTechnologyDefinition = {
	id: "bluecore",
	name: "Bluecore",
	website: "https://www.bluecore.com",
	description: "Bluecore is a retail marketing technology that uses data gained from direct marketing like email, social media, site activity.",
	icon: "Bluecore.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "bluecore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bluecore\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bluecore:jsGlobal:1",
			kind: "jsGlobal",
			property: "_bluecoreTrack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bluecore:jsGlobal:2",
			kind: "jsGlobal",
			property: "bluecore_action_trigger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bluecore:jsGlobal:3",
			kind: "jsGlobal",
			property: "triggermail",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bluecore:jsGlobal:4",
			kind: "jsGlobal",
			property: "triggermail_email_address",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
