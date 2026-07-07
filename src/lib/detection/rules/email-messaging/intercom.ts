import type { TechnologyDefinition } from '../../types';

export const intercomTechnologyDefinition = {
	id: "intercom",
	name: "Intercom",
	website: "https://www.intercom.com",
	description: "Intercom is an American software company that produces a messaging platform which allows businesses to communicate with prospective and existing customers within their app, on their website, through social media, or via email.",
	icon: "Intercom.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "intercom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:api\\.intercom\\.io\\/api|static\\.intercomcdn\\.com\\/intercom\\.v1)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intercom:dom:1",
			kind: "dom",
			selector: "link[href^='https://widget.intercom.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "intercom:dom:2",
			kind: "dom",
			selector: "div.live-chat-loader-placeholder",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "intercom:dom:3",
			kind: "dom",
			selector: "iframe#intercom-frame",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "intercom:jsGlobal:4",
			kind: "jsGlobal",
			property: "Intercom",
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
} as const satisfies TechnologyDefinition;
