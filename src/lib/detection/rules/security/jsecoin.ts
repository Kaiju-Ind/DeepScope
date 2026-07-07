import type { TechnologyDefinition } from '../../types';

export const jsecoinTechnologyDefinition = {
	id: "jsecoin",
	name: "JSEcoin",
	website: "https://jsecoin.com/",
	description: "JSEcoin is a way to mine, receive payments for your goods or services and transfer cryptocurrency.",
	icon: "JSEcoin.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "jsecoin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^(?:https):?\\/\\/load\\.jsecoin\\.com\\/load\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jsecoin:jsGlobal:1",
			kind: "jsGlobal",
			property: "jseMine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
