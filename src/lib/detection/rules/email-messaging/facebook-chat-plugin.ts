import type { TechnologyDefinition } from '../../types';

export const facebookChatPluginTechnologyDefinition = {
	id: "facebook-chat-plugin",
	name: "Facebook Chat Plugin",
	website: "https://developers.facebook.com/docs/messenger-platform/discovery/facebook-chat-plugin/",
	description: "Facebook Chat Plugin is a website plugin that businesses with a Facebook Page can install on their website.",
	icon: "Facebook.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "facebook-chat-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.facebook\\.net\\/.+\\.customerchat\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "facebook-chat-plugin:dom:1",
			kind: "dom",
			selector: "iframe[src*='.facebook.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "facebook-chat-plugin:jsGlobal:2",
			kind: "jsGlobal",
			property: "facebookChatSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
