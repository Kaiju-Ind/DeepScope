import type { TechnologyDefinition } from '../../types';

export const rubyChatTechnologyDefinition = {
	id: "ruby-chat",
	name: "Ruby Chat",
	website: "https://www.ruby.com/solutions/live-chat",
	description: "Ruby Chat is a service offering live virtual receptionists and live chat to assist businesses in managing customer interactions and inquiries in real-time.",
	icon: "RubyChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ruby-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chatwidget\\.ruby\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ruby-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "rubyChatLoading",
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
