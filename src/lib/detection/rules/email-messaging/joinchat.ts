import type { TechnologyDefinition } from '../../types';

export const joinchatTechnologyDefinition = {
	id: "joinchat",
	name: "Joinchat",
	website: "https://join.chat",
	description: "Joinchat is a tool that enables businesses to convert customer conversations into sales or leads through integrated communication features.",
	icon: "Joinchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "joinchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/joinchat\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "joinchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "joinchat_obj",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
