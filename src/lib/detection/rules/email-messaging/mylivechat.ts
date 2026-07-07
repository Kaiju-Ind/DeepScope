import type { TechnologyDefinition } from '../../types';

export const mylivechatTechnologyDefinition = {
	id: "mylivechat",
	name: "MyLiveChat",
	website: "https://mylivechat.com",
	description: "MyLiveChat is a live chat developed by CuteSoft.",
	icon: "MyLiveChat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mylivechat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mylivechat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mylivechat:jsGlobal:1",
			kind: "jsGlobal",
			property: "MyLiveChat.Version",
			valuePattern: new RegExp("(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
